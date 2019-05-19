import * as mongoose from 'mongoose';

const GameSchema = new mongoose.Schema ({
    gameID: {
        type: String,
        unique: true,
        required: true,        
    },
    players: [{
        type: String,
    }],
    GameStateStrings: [{
        type: [String],
    }], 
});

interface GameModel {
    gameID: String;
    players: String[];
    GameStateStrings: (string | String[])[];
}

export interface GameData extends GameModel, mongoose.Document { }

export const GameData = mongoose.model<GameData>('GameData', GameSchema)