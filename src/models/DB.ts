import mongoose from 'mongoose';

import { dbHost, dbHostPort, dbName, dbOptions } from '../Config';

export const db = mongoose.connect(`mongodb://${dbHost}:${dbHostPort}/${dbName}`, dbOptions);