import { Request, Response } from 'express';
import { User } from '../../models/User';
import { createPlayer, getPlayer, constantStrings} from './internal';
import util from 'util';
import crypto from 'crypto';

const pbkdf2P = util.promisify(crypto.pbkdf2);

function encrypt(password: string, salt: Buffer): Promise<Buffer> {
  return pbkdf2P(password, salt, 10000, 256, "sha512");
}

export async function webGetUser(req: Request, res: Response) {
    const user = await getUser(req.params.username);
    if (!user) {
        res.status(404);
        res.json({ message: "User not found" });
    }
    else {
        res.json(user);
    }
}

export async function getUser(usernameString: String) {
    const user = await User.findOne({ username: usernameString });
    return user;    
}

export async function webCreateUser(req: Request, res: Response) { 
    console.log(req.body);
    const user = await createUser(req.params.username, req.body.password);
    
    res.json(user);
}

export async function createUser(usernameString: String, passwordString: String) {
    if (usernameString === undefined || passwordString === undefined) {
        console.log(`UsernameString: ${usernameString}`);
        console.log(`PasswordString: ${passwordString}`);
        return { message: "Missing params" };
    }
    const user = new User();
    user.username = usernameString;
    let player = await createPlayer(user.username);
    let playerID: String | undefined;
    if (!player) {
        
    }
    else {
        playerID = player.playerID;
    }
    if (playerID !== undefined) {
        user.playerID = playerID;
    }
    user.salt = crypto.randomBytes(8);
    user.password = await encrypt(passwordString.toString(), user.salt);

    await user.save();
    return user;    
}

export async function webCheckPassword(req: Request, res: Response) {
    const checkResult = await checkPassword(req.body.username, req.body.password);
    res.json({ match: checkResult });
}

export async function checkPassword(usernameString: String, passwordString: String) {
    if (usernameString === undefined || passwordString === undefined) {
        return { message: "Missing params" };
    }
    const user = await User.findOne({ username: usernameString });
    console.log(user);
    if (!user) {
        return false;  
    }
    else if (user.password.equals(await encrypt(passwordString.toString(), user.salt))) {
        return true;
    }
    else {
        return false;
    }
}

export async function webCheckAccountAvailable(req: Request, res: Response) {
    const checkResult = await checkAccountAvailable(req.body.username);
    res.json({ available: checkResult });
}

export async function checkAccountAvailable(usernameString: String) {
    const user = await getUser(usernameString);
    if (user) {
        return false;
    }
    else {
        return true;
    }
}


export async function webDeleteUser(req: Request, res: Response) {
    const result = deleteUser(req.body.username);
    if (result) {
        res.json({user: 'Deleted'});
    }
    else {
        res.json({user: 'Not found'});
    }
    
}

export async function deleteUser(usernameString: String) {
    const user = await User.findOne({ username: usernameString });
    //const user = await getUser(usernameString);
    if (user) {
        const player = await getPlayer(user.playerID);
        if (player) {
            player.remove();
        }        
        user.remove();
        return true;
    }
    else {
        return false;
    }
}

export async function webUpdateUser(req: Request, res: Response) {
    const results = await updateUser(req.body.targetUser, req.body.user);
    res.json(results);
}

export async function updateUser(targetUser: string, user: {username?: string, password?: string, playername?: string}) {
    const results = [];

    if (user.username) {
        if (await updateUserName(targetUser, user.username)) {
            results.push(constantStrings.USERNAME_MODIFIED);
            // If username changed, cannot use targetUser
            const username = user.username;
            const password = user.password;
            const playername = user.playername;
            results.push(... await modifiedUsernameUpdate({username, password, playername}));
        }
        else {
            results.push(constantStrings.USERNAME_NOT_MODIFIED);
        }
    }
    else if (user.password) {
        results.push(await updateUserPassword(targetUser, user.password) ? constantStrings.PASSWORD_MODIFIED : constantStrings.PASSWORD_NOT_MODIFIED);
        
        if (user.playername) {
            results.push(await updateUserPlayer(targetUser, user.playername) ? constantStrings.PLAYERNAME_MODIFIED : constantStrings.PLAYERNAME_NOT_MODIFIED);
        }
    }
    else if (user.playername) {
        results.push(await updateUserPlayer(targetUser, user.playername) ? constantStrings.PLAYERNAME_MODIFIED : constantStrings.PLAYERNAME_NOT_MODIFIED);
    }

    return results;
}

export async function modifiedUsernameUpdate(user: {username: string, password?: string, playername?: string}) {
    const results = [];
    if (user.password) {
        results.push(await updateUserPassword(user.username, user.password) ? constantStrings.PASSWORD_MODIFIED : constantStrings.PASSWORD_NOT_MODIFIED);
    }
    if (user.playername) {
        results.push(await updateUserPlayer(user.username, user.playername) ? constantStrings.PLAYERNAME_MODIFIED : constantStrings.PLAYERNAME_NOT_MODIFIED);
    }
    return results;
}

export async function updateUserName(targetUsername: string, newUsername: string) {
    const user = await getUser(targetUsername);
    if (user) {
        user.username = newUsername;
        user.save();
        return true;
    }
    return false;
}

export async function updateUserPlayer(targetUsername: string, newPlayername: string) {
    const user = await getUser(targetUsername);
    if (user) {
        const player = await getPlayer(user.playerID);
        if (player) {
            player.username = newPlayername;
            player.save();
            return true;
        }
    }
    return false;
}

export async function updateUserPassword(targetUsername: string, newPassword: string) {
    const user = await getUser(targetUsername);
    if (user) {
        user.salt = crypto.randomBytes(8);
        user.password = await encrypt(newPassword, user.salt);
        user.save();
        return true;
    }
    return false;
}