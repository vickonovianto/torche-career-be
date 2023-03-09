import dotenv from 'dotenv';
import runServer from './framework/express/app';

// import environment variables from .env file
dotenv.config();

// run server
runServer();
