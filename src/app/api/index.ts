import { NextFunction, Request, Response, Router } from 'express';
import { webGetGameData, webCreateGameData, webUpdateGameData } from '../api/GameData';
import { webGetUser, webCreateUser, webCheckPassword, webCheckAccountAvailable } from './User';
import { webGetPlayer, webUpdatePlayer } from './Player';
import cors from 'cors';
import bodyParser = require('body-parser');

export const router = Router();


router.use(cors());

const jsonParser = bodyParser.json();

router.get('/gameData/:gameID', webGetGameData);
router.post('/gameData/:gameID', jsonParser, webCreateGameData);
router.patch('/gameData/:gameID', jsonParser, webUpdateGameData);

router.get('/users/:username', webGetUser);
router.post('/users/:username', jsonParser, webCreateUser);

router.post('/login/', jsonParser, webCheckPassword);
router.post('/register/', jsonParser, webCheckAccountAvailable);

router.get('/players/:playerID', webGetPlayer);
router.patch('/players/:playerID', jsonParser, webUpdatePlayer);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json({ message: err.toString() });
});