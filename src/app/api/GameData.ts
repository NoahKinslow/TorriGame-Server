import { Request, Response } from 'express';
import { GameData } from '../../models/GameData';
import { createID } from '../../util';

export async function getGameData(req: Request, res: Response) {
    const gameData = await GameData.findOne({ gameID: req.params.gameID });
    if (!gameData) {
        res.status(404);
        res.json({ message: 'GameData not found' });
    }
    else {
        res.json(gameData);
    }
}

export async function createGameData(req: Request, res: Response) {
    const gameData = new GameData();
    gameData.gameID = createID(15);
    gameData.players = req.params.players;
    gameData.gameStateStrings = req.params.gameStateStrings;

    await gameData.save();
    res.json(gameData);
}

export async function updateGameData(req: Request, res: Response) {
    const gameData = await GameData.findOne({ gameID: req.params.gameID });
    if (!gameData) {
        res.status(404);
        res.json({ message: 'GameData not found' });
    }
    else {
        gameData.gameStateStrings = req.params.gameStateStrings;
        await gameData.save();
        res.json(gameData);
    }
}