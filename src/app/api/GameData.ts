import { Request, Response } from 'express';
import { GameData } from '../../models/GameData';
import { createID } from '../../Util';
import { setupNewGame, takeTurnAction } from '../gamecore/TorriEngine';
import { convertGameStateToJson, convertJsonToGameState } from '../gamecore/GameState';
import { getPlayer } from './Player';
import { getUser } from './User';
import { moveAction, invalidMove } from '../gamecore/ConstantStrings';

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
    let userA = await getUser(req.body.usernameA);
    let userB = await getUser(req.body.usernameB);
    if (userA && userB) {
        let playerA = userA.playerID;
        let playerB = userB.playerID;

        let gameStateStrings = setupNewGame(playerA, playerB);

        const gameData = await createGameData([playerA, playerB] , convertGameStateToJson(gameStateStrings));

        res.json(gameData);
    }
    else {
        res.status(404);
        res.json({ message: 'Users not found' });
    }    
}

export async function createGameData(players: String[], gameStateStrings: (string | String[])[]) {
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
export async function updateGameData(gameIDString: String, gameStateStrings: (string | String[])[]) {
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

export async function webMakeMoveOnGameData(req: Request, res: Response) {
    if (req.body.actionParms === undefined) {
        res.status(404);
        res.json({ message: 'actionParms missing' });
    }
    else {
        const gameData = await makeMoveOnGameData(req.params.gameID, req.body.actionParms);
        res.json(gameData);
    }    
}

export async function makeMoveOnGameData(gameIDString: String, actionParms: String[]) {
    const gameData = await getGameData(gameIDString);
    if (gameData) {
        let rawGameState = convertJsonToGameState(gameData.gameStateStrings);
        let results = takeTurnAction(rawGameState, moveAction, actionParms);
        if (results.includes(invalidMove)) {
            
        }
        else {
            updateGameData(gameIDString, convertGameStateToJson(rawGameState));
        }
        return gameData;
    }
}