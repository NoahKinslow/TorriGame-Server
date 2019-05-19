import { Request, Response } from 'express';
import { User } from '../../models/User';
import { createPlayer } from './Player';
import util from 'util';
import crypto from 'crypto';

const pbkdf2P = util.promisify(crypto.pbkdf2);

function encrypt(password: string, salt: Buffer): Promise<Buffer> {
  return pbkdf2P(password, salt, 10000, 256, 'sha512');
}

export async function webGetUser(req: Request, res: Response) {
    const user = await getUser(req.params.username);
    if (!user) {
        res.status(404);
        res.json({ message: 'User not found' });
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
    const user = await createUser(req.params.username, req.body.password);
    
    res.json(user);
}

export async function createUser(usernameString: String, passwordString: String) {
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