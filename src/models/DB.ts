import * as mongoose from 'mongoose';

import { dbHost, dbName, dbOptions } from '../Config';

export const db = mongoose.connect(`mongodb://${dbHost}/${dbName}`, dbOptions);