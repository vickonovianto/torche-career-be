const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const Admin = require('../../../database/mongodb/model/admin.model.js');
const adminUsecase = require('../../../usecase/admin.usecase.js');
const responseHelper = require('../response-helper.js');
const controllerHelper = require('../controller-helper.js');
const shallowCopier = require('../../../util/shallow-copier.js');

async function registerAdmin(req,res,next) {
    try {
        const admin = shallowCopier.filterProperties(req.body, Admin.registerInput);
        await adminUsecase.registerAdmin(admin);
        responseHelper.sendSuccessResponse(res, "Create Admin Successful", {});
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to create admin: ${e}`]);   
    }
}

const registerHandlers = [
    checkSchema(Admin.registerValidation),
    controllerHelper.validateRequest,
    registerAdmin
];

async function loginAdmin(req,res,next) {
    try {
        if (!req.session.adminid) {
            const admin = shallowCopier.filterProperties(req.body, Admin.loginInput);
            const loginAdminResult = await adminUsecase.loginAdmin(admin);
            req.session.adminid = loginAdminResult._id;
            responseHelper.sendSuccessResponse(res, "Login Admin Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 400, [`Unable to login admin: Admin already logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to login admin: ${e}`]);   
    }
}

const loginHandlers = [
    checkSchema(Admin.loginValidation),
    controllerHelper.validateRequest,
    loginAdmin
];

async function logoutAdmin(req,res,next) {
    try {
        if (req.session.adminid) {
            req.session.destroy();
        } 
        res.redirect('/');
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to logout admin: ${e}`]);   
    }
}

const logoutHandlers = [
    logoutAdmin
];

async function getMyProfile(req,res,next) {
    try {
        if (req.session.adminid) {
            const adminResult = await adminUsecase.getAdminById(req.session.adminid);
            const admin = shallowCopier.filterProperties(adminResult, Admin.basicProfile);
            responseHelper.sendSuccessResponse(res, "Get Profile Successful", admin);
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to get profile: Admin must be logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to get profile: ${e}`]);   
    }
}

const getMyProfileHandlers = [
    getMyProfile
];

async function updateBasicProfile(req,res,next) {
    try {
        if (req.session.adminid) {
            const profile = shallowCopier.filterProperties(req.body, Admin.basicProfile);
            await adminUsecase.updateAdminById(req.session.adminid, profile);
            responseHelper.sendSuccessResponse(res, "Update Admin Profile Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to update profile: Admin must be logged in`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to update profile: ${e}`]);   
    }
}

const updateBasicProfileHandlers = [
    checkSchema(Admin.updateProfileValidation),
    controllerHelper.validateRequest,
    updateBasicProfile
];

const router = express.Router();

router.route('/register').post(...registerHandlers);
router.route('/login').post(...loginHandlers);
router.route('/logout').post(...logoutHandlers);
router.route('/profile').get(...getMyProfileHandlers);
router.route('/profile').put(...updateBasicProfileHandlers);

module.exports = router;