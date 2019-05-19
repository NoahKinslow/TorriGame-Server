import { Request, Response } from 'express';
import { GameData } from '../../models/GameData';
import { createID } from '../../Util';

export async function webGetGameData(req: Request, res: Response) {
    const gameData = await getGameData(req.params.gameID);
    if (!gameData) {
        res.status(404);
        res.json({ message: 'GameData not found' });
    }
    else {
        res.json(gameData);
    }
}

export async function getGameData(gameIDString: String) {
    const gameData = await GameData.findOne({ gameID: gameIDString });
    return gameData;
}

export async function webCreateGameData(req: Request, res: Response) {
    const gameData = await createGameData(req.params.players, req.body.gameStateStrings);
    res.json(gameData);
}

export async function createGameData(players: String[], gameStateStrings: (string | String[])) {
    const gameData = new GameData();
    gameData.gameID = createID(15);
    gameData.players = players;
    gameData.gameStateStrings = gameStateStrings;

    await gameData.save();
    return gameData;
}

export async function webUpdateGameData(req: Request, res: Response) {
    const gameData = await updateGameData(req.params.gameID, req.body.gameStateStrings);
    if (!gameData) {
        res.status(404);
        res.json({ message: 'GameData not found' });
    }
    else {
        res.json(gameData);
    }
}

// Replace a game's gameStateStrings
export async function updateGameData(gameIDString: String, gameStateStrings: (string | String[])) {
    const gameData = await GameData.findOne({ gameID: gameIDString });
    if (!gameData) {
        return gameData;
    }
    else {
        gameData.gameStateStrings = gameStateStrings;
        await gameData.save();
        return gameData;
    }
}