import mongoose from 'mongoose';

import './db';

const LobbySchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    playerID: { 
        type: String,
        unique: true,
        required: true,
    }
});

export interface LobbyData {
    username: String;
    playerID: String;
}

export interface Lobby extends LobbyData, mongoose.Document { }
export const Lobby = mongoose.model<Lobby>('Lobby', LobbySchema);