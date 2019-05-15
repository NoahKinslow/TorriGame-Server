import http from 'http';

import { app } from './app';
import { serverPort } from './config';

const server = http.createServer(app);

server.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
  });
  