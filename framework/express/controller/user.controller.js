const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const User = require('../../../database/mongodb/model/user.model.js');
const userUsecase = require('../../../usecase/user.usecase.js');
const responseHelper = require('../response-helper.js');
const controllerHelper = require('../controller-helper.js');
const shallowCopier = require('../../../util/shallow-copier.js');

async function registerUser(req,res,next) {
    try {
        const user = shallowCopier.filterProperties(req.body, User.registerInput);
        await userUsecase.registerUser(user);
        responseHelper.sendSuccessResponse(res, "Create User Successful", {});
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to create user: ${e}`]);   
    }
}

const registerHandlers = [
    checkSchema(User.registerValidation),
    controllerHelper.validateRequest,
    registerUser
];

async function loginUser(req,res,next) {
    try {
        if (!req.session.userid) {
            const user = shallowCopier.filterProperties(req.body, User.loginInput);
            const loginUserResult = await userUsecase.loginUser(user);
            req.session.userid = loginUserResult._id;
            responseHelper.sendSuccessResponse(res, "Login User Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 400, [`Unable to login user: User already logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to login user: ${e}`]);   
    }
}

const loginHandlers = [
    checkSchema(User.loginValidation),
    controllerHelper.validateRequest,
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

const logoutHandlers = [
    logoutUser
];

async function getBasicProfile(req,res,next) {
    try {
        if (req.session.userid) {
            const userResult = await userUsecase.getUserById(req.session.userid);
            const user = shallowCopier.filterProperties(userResult, User.basicProfile);
            responseHelper.sendSuccessResponse(res, "Get Basic Profile Successful", user);
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to get basic profile: User must be logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to get basic profile: ${e}`]);   
    }
}

const getBasicProfileHandlers = [
    getBasicProfile
];

async function updateBasicProfile(req,res,next) {
    try {
        if (req.session.userid) {
            const profile = shallowCopier.filterProperties(req.body, User.basicProfile);
            await userUsecase.updateUserById(req.session.userid, profile);
            responseHelper.sendSuccessResponse(res, "Update Basic Profile Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to update profile: User must be logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to update basic profile: ${e}`]);   
    }
}

const updateBasicProfileHandlers = [
    checkSchema(User.updateProfileValidation),
    controllerHelper.validateRequest,
    updateBasicProfile
];

const router = express.Router();

router.route('/register').post(...registerHandlers);
router.route('/login').post(...loginHandlers);
router.route('/logout').post(...logoutHandlers);
router.route('/basic-profile').get(...getBasicProfileHandlers);
router.route('/basic-profile').put(...updateBasicProfileHandlers);

module.exports = router;