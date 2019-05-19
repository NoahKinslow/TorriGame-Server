import mongoose from 'mongoose';

import './db';

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { 
        type: Buffer,
        required: true,
    },
    salt: Buffer,
    playerID: String,
});

export interface UserData {
    username: String;
    password: Buffer;
    salt: Buffer;
    playerID: String;
}

export interface User extends UserData, mongoose.Document { }
export const User = mongoose.model<User>('User', UserSchema);