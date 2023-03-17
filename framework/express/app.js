const express = require('express');
const cors = require('cors');

const responseHelper = require('./response-helper.js');
const dbUtil = require('../.././database/mongodb/db-util.js');
const userController = require('./controller/user.controller.js');

// check validity of .env file
function checkEnvFile() {
    if (process.env.HOST === '') {
        throw new Error('File .env: HOST cannot be empty');
    }
    if (process.env.PORT === '') {
        throw new Error('File .env: PORT cannot be empty');
    }
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production') {
        throw new Error('File .env: NODE_ENV can only contain development or production');
    }
    if (process.env.WHITELISTED_DOMAIN_CORS === '') {
        throw new Error('File .env: WHITELISTED_DOMAIN_CORS cannot be empty');
    }
    if (process.env.MONGODB_URI === '') {
        throw new Error('File .env: MONGODB_URI cannot be empty');
    }
    if (process.env.DB_NAME === '') {
        throw new Error('File .env: DB_NAME cannot be empty');
    }
}

function runServer() {
    // handle event when server is terminated
    const cleanUp = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
        dbUtil.disconnectDB();
        process.exit(); // Exit with default success-code '0'.
    };
    process.on('SIGINT', cleanUp);
    process.on('SIGTERM', cleanUp);

    const app = express();

    // check validity of the .env file
    checkEnvFile();

    // set up cors middleware
    const corsOptions = {
        origin: function(origin, callback) {
            if (process.env.NODE_ENV === "development") {
                if (origin === process.env.WHITELISTED_DOMAIN_CORS || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            } else if (process.env.NODE_ENV === "production") {
                if (origin === process.env.WHITELISTED_DOMAIN_CORS) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }
    };

    app.use(cors(corsOptions), (err, req, res, next) => {
        responseHelper.sendErrorResponse(res, 400, ['Not allowed by CORS']);
    });

    app.use(express.json());

    // connect to db
    dbUtil.connectDB();

    app.get('/', (req, res) => {
        responseHelper.sendSuccessResponse(res, 'Express + TypeScript Server', {});
    });

    app.use(`${process.env.API_PREFIX}/users`, userController);

    app.use("*", (req,res) => {
        responseHelper.sendErrorResponse(res, 404, ['Not Found']);
    });

    const port = process.env.PORT;
    const host = process.env.HOST;
    app.listen(port, host, () => {
        console.log(`⚡️[server]: Server is running at ${host}:${port}`);
    });
}

module.exports = { runServer };
