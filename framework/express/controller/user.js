const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const User = require('../../../database/mongodb/model/user.js');
const userUsecase = require('../../../usecase/user.js');
const responseHelper = require('../response-helper.js');

async function validateUser(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseHelper.sendErrorResponse(res, 400, errors.array());
    } else {
        const password = req.body.password;
        const passwordRepeat = req.body.passwordRepeat;
        if (password === passwordRepeat) {
            next();
        } else {
            responseHelper.sendErrorResponse(res, 400, ['Unable to create user: password must be equal to passwordRepeat']);
        }
    }
}

async function createUser(req,res,next) {
    const email = req.body.email;
    try {
        const createUserResult = await userUsecase.createUser({ email: email });
        responseHelper.sendSuccessResponse(res, "Create User Successful", createUserResult);
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to create user: ${e}`]);   
    }
}

const router = express.Router();

router.route('/register').post(checkSchema(User.validationSchema), validateUser, createUser);

module.exports = router;