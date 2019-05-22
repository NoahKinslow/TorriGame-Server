// Port server should listen on
export let serverPort = 8000;

// Log format for morgan
export let logFormat = 'dev';

// Database connection information
export let dbHost = 'localhost';
export let dbHostPort = '27017';
export let dbName = 'torriDB';
export let dbOptions = {
  // user: 'userName',
  // pass: 'password',
};

// Session options for express-session
export let sessionOptions = {
  secret: 'famicom',
  saveUninitialized: false,
  resave: true,
};