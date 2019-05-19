import * as mongoose from 'mongoose';

import { dbHost, dbName, dbOptions } from '../config';

export const db = mongoose.connect(`mongodb://${dbHost}/${dbName}`, dbOptions);