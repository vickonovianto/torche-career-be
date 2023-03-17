const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const User = require('../../../database/mongodb/model/user.model.js');
const userUsecase = require('../../../usecase/user.usecase.js');
const responseHelper = require('../response-helper.js');
const shallowCopier = require('../../../util/shallow-copier.js');

async function validateRegisterRequest(req,res,next) {
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

async function registerUser(req,res,next) {
    try {
        const user = shallowCopier.filterProperties(req.body, User.properties);
        const createUserResult = await userUsecase.registerUser(user);
        responseHelper.sendSuccessResponse(res, "Create User Successful", createUserResult);
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to create user: ${e}`]);   
    }
}

const registerMiddlewares = [
    checkSchema(User.registerValidation),
    validateRegisterRequest,
    registerUser
];

async function validateLoginRequest(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseHelper.sendErrorResponse(res, 400, errors.array());
    } else {
        next();
    }
}

async function loginUser(req,res,next) {
    try {
        const user = shallowCopier.filterProperties(req.body, User.properties);
        const loginUserResult = await userUsecase.loginUser(user);
        req.session.userid = loginUserResult._id;
        responseHelper.sendSuccessResponse(res, "Login User Successful", {});
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to login user: ${e}`]);   
    }
}

const loginMiddlewares = [
    checkSchema(User.loginValidation),
    validateLoginRequest,
    loginUser
];

const router = express.Router();

router.route('/register').post(...registerMiddlewares);
router.route('/login').post(...loginMiddlewares);

module.exports = router;