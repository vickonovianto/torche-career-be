const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const Job = require('../../../database/mongodb/model/job.model.js');
const jobUsecase = require('../../../usecase/job.usecase.js');
const responseHelper = require('../response-helper.js');
const controllerHelper = require('../controller-helper.js');
const shallowCopier = require('../../../util/shallow-copier.js');

async function createJob(req,res,next) {
    try {
        if (req.session.adminid) {
            const job = shallowCopier.filterProperties(req.body, Job.createInput);
            job.jobAdminId = req.session.adminid;
            await jobUsecase.createJob(job);
            responseHelper.sendSuccessResponse(res, "Create Job Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to create job: Only logged in admin can create job`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to create job: ${e}`]);   
    }
}

const createHandlers = [
    checkSchema(Job.createValidation),
    controllerHelper.validateRequest,
    createJob
];

async function getListOfJob(req,res,next) {
    try {
        const jobsResult = await jobUsecase.getJobs();
        const filteredJobs = [];
        for (const job of jobsResult) {
            const filteredJob = shallowCopier.filterProperties(job, Job.viewOutput);
            filteredJobs.push(filteredJob);
        }
        responseHelper.sendSuccessResponse(res, "Get List of Job Successful", filteredJobs);
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to get list of jobs: ${e}`]);   
    }
}

const getListOfJobHandlers = [
    getListOfJob
];

const router = express.Router();

router.route('/create').post(...createHandlers);
router.route('/').get(...getListOfJobHandlers);

module.exports = router;