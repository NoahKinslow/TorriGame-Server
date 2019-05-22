import { Request, Response } from 'express';
import { Lobby } from '../../models/Lobby';
import { getPlayer } from './Player';

export async function webGetLobby(req: Request, res: Response) {
    const lobby = await getLobby(req.params.username);
    if (!lobby) {
        res.status(404);
        res.json({ message: "Lobby not found" });
    }
    else {
        res.json(lobby);
    }
}

export async function getLobby(usernameString: String) {
    const lobby = await Lobby.findOne({ username: usernameString });
    return lobby;    
}

export async function webCreateLobby(req: Request, res: Response) { 
    console.log(req.body);
    const lobby = await createLobby(req.params.username);
    
    res.json(lobby);
}

export async function createLobby(usernameString: String) {
    if (usernameString === undefined) {
        console.log(`UsernameString: ${usernameString}`);
        return { message: "missing params" };
    }
    const lobby = new Lobby();
    lobby.username = usernameString;

    let player = await getPlayer(usernameString);
    let playerID: String | undefined;
    if (!player) {
        
    }
    else {
        playerID = player.playerID;
    }
    if (playerID !== undefined) {
        lobby.playerID = playerID;
    }

    await lobby.save();
    return lobby;    
}

export async function webDeleteLobby(req: Request, res: Response) {
    const lobby = await deleteLobby(req.params.username);
    if (!lobby) {
        res.status(404);
        res.json({ message: "Lobby not found" });
    }
    else {
        res.json(lobby);
    }
}

export async function deleteLobby(usernameString: String) {
    if (usernameString === undefined) {
        console.log(`UsernameString: ${usernameString}`);
        return { message: "missing params" };
    }
    const lobby = await Lobby.findOne({ username: usernameString });

    if (lobby) {
        lobby.remove();
    }
    else {

    }
    return lobby;
}
