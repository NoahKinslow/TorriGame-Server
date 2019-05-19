import { NextFunction, Request, Response, Router } from 'express';
import { webGetGameData, webCreateGameData, webUpdateGameData } from '../api/GameData';
import { webGetUser, webCreateUser } from './User';
import { webGetPlayer, webUpdatePlayer } from './Player';

export const router = Router();

router.get('/gameData/:gameID', webGetGameData);
router.post('/gameData/:gameID', webCreateGameData);
router.patch('/gameData/:gameID', webUpdateGameData);

router.get('/users/:username', webGetUser);
router.post('/users/:username', webCreateUser);

router.get('/players/:playerID', webGetPlayer);
router.patch('/players/:playerID', webUpdatePlayer);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json({ message: err.toString() });
  });