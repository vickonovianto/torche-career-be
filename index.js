// import environment variables from .env file
require('dotenv').config();

// run server
const app = require('./framework/express/app.js');
app.runServer();
