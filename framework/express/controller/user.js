const express = require('express');

const userUsecase = require('../../../usecase/user.js');
const responseHelper = require('../response-helper.js');

async function createUser(req,res,next) {
    const email = req.body.email;
    try {
        const createUserResult = await userUsecase.createUser({ email: email });
        responseHelper.sendSuccessResponse(res, "Create User Successful", createUserResult);
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, `${e}`);
    }
}

const router = express.Router();

router.route('/register').post(createUser);

module.exports = router;