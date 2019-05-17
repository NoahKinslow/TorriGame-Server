import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import * as config from '../Config';

export const app = express();

// Logging
if (config.logFormat) {
    app.use(morgan(config.logFormat));
  }