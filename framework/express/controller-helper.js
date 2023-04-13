const { validationResult } = require('express-validator');

const responseHelper = require('./response-helper.js');

async function validateRequest(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseHelper.sendErrorResponse(res, 400, errors.array());
    } else {
        next();
    }
}

module.exports = { validateRequest };