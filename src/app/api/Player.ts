import { Request, Response } from 'express';
import { createID } from '../../Util';
import { Player } from '../../models/Player';

export async function webGetPlayer(req: Request, res: Response) {
    const player = await getPlayer(req.params.playerID);
    if (!player) {
        res.status(404);
        res.json({ message: "Player not found" });
    }
    else {
        res.json(player);
    }
}

export async function getPlayer(playerID: String) {
    const player = await Player.findOne({ playerID: playerID });
    return player;
}

export async function webCreatePlayer(req: Request, res: Response) {
    const player = await createPlayer(req.params.username);
    res.json(player);
}

export async function createPlayer(username: String) {
    const player = new Player();
    player.playerID = createID(15);
    player.username = username;
    await player.save();
    return player;
}

export async function webUpdatePlayer(req: Request, res: Response) {
    const player = await updatePlayer(req.params.playerID, req.params.gameID);
    if (!player) {
        res.status(404);
        res.json({ message: "Player not found" });
    }
    else {
        res.json(player);
    }
}

// Add a gameID to a player
export async function updatePlayer(playerIDString: String, gameIDString: String) {
    const player = await Player.findOne({ playerID: playerIDString });
    if (!player) {
        return player;
    }
    else {
        let tempGameIDs = player.gameIDs;
        tempGameIDs.push(gameIDString);
        player.gameIDs = tempGameIDs;
        await player.save();
        return player;
    }
}