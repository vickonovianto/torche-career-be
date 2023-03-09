import express from 'express';
import cors from 'cors';

import { sendErrorResponse, sendSuccessResponse } from './response.js';

// check validity of .env file
function checkEnvFile() {
    if (process.env.PORT === '') {
        throw new Error('File .env: PORT cannot be empty');
    }
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production') {
        throw new Error('File .env: NODE_ENV can only contain development or production');
    }
    if (process.env.WHITELISTED_DOMAIN === '') {
        throw new Error('File .env: WHITELISTED_DOMAIN cannot be empty');
    }
}

function runServer() {
    const app = express();

    // check validity of the .env file
    checkEnvFile();

    // set up cors middleware
    const corsOptions = {
        origin: function(origin, callback) {
            if (process.env.NODE_ENV === "development") {
                if (origin === process.env.WHITELISTED_DOMAIN || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            } else if (process.env.NODE_ENV === "production") {
                if (origin === process.env.WHITELISTED_DOMAIN) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }
    };

    app.use(cors(corsOptions), (err, req, res, next) => {
        sendErrorResponse(res, 400, 'Not allowed by CORS');
    });

    app.get('/', (req, res) => {
        sendSuccessResponse(res, 'Express + TypeScript Server', {});
    });

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}

export default runServer;
