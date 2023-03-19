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
        const user = shallowCopier.filterProperties(req.body, User.inputProperties);
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
        const user = shallowCopier.filterProperties(req.body, User.inputProperties);
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

async function logoutUser(req,res,next) {
    try {
        if (req.session.userid) {
            req.session.destroy();
        } 
        res.redirect('/');
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to logout user: ${e}`]);   
    }
}

const logoutMiddlewares = [
    logoutUser
];

async function validateGetByIdRequest(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseHelper.sendErrorResponse(res, 400, errors.array());
    } else {
        next();
    }
}

async function getMyProfile(req,res,next) {
    try {
        if (req.session.userid) {
            const userResult = await userUsecase.getUserById(req.session.userid);
            const user = shallowCopier.filterProperties(userResult, User.outputProperties);
            responseHelper.sendSuccessResponse(res, "Get My Profile Successful", user);
        } else {
            responseHelper.sendErrorResponse(res, 400, [`Unable to get my profile: ${e}`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to login user: ${e}`]);   
    }
}

const getByIdMiddlewares = [
    checkSchema(User.idValidation),
    validateGetByIdRequest,
    getMyProfile
];

const router = express.Router();

router.route('/register').post(...registerMiddlewares);
router.route('/login').post(...loginMiddlewares);
router.route('/logout').post(...logoutMiddlewares);
router.route('/profile').get(...getByIdMiddlewares);

module.exports = router;