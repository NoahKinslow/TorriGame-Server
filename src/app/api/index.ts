import { NextFunction, Request, Response, Router } from 'express';
import { getGameData, createGameData, updateGameData } from '../api/GameData';

export const router = Router();

router.get('/gameData/:gameID', getGameData);
router.post('/gameData/:gameID-:players-:gameStateStrings', createGameData);
router.patch('/gameData/:gameID-:gameStateStrings', updateGameData);


router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json({ message: err.toString() });
  });