import { Request, Response } from 'express';
import { User } from '../../models/User';
import { createPlayer } from './Player';
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
        return { message: "missing params" };
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
        return { message: "missing params" };
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