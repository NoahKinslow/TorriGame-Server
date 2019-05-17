import http from 'http';

import { app } from './app/Index';
import { serverPort } from './Config';

const server = http.createServer(app);

server.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
  });
  