import * as mongoose from 'mongoose';

import './db';

const GameSchema = new mongoose.Schema ({
    gameID: {
        type: String,
        unique: true,
        required: true,
        minlength: 15,
        maxlength: 15,
    },
    players: [{
        type: String,
    }],
    gameStateStrings: {
        type: [String],
    }, 
});

interface GameModel {
    gameID: String;
    players: String[];
    gameStateStrings: (string | String[])[];
}

export interface GameData extends GameModel, mongoose.Document { }

export const GameData = mongoose.model<GameData>('GameData', GameSchema)