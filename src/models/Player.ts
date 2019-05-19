import mongoose from 'mongoose';

import './db';

const PlayerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    playerID: { 
        type: String,
        unique: true,
        required: true,
    },
    gameIDs: [{
        type: String,
    }],
});

export interface PlayerData {
    username: String;
    playerID: String;
    gameIDs: [String];
}

export interface Player extends PlayerData, mongoose.Document { }
export const Player = mongoose.model<Player>('Player', PlayerSchema);