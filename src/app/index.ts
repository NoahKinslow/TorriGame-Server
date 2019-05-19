import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import morgan from 'morgan';
import * as config from '../Config';


import * as api from './api';

export const app = express();

// Logging
if (config.logFormat) {
    app.use(morgan(config.logFormat));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession(config.sessionOptions));

app.use('/api', api.router);