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

async function getJobDetail(req,res,next) {
    try {
        const jobId = req.params.id; 
        const jobResult = await jobUsecase.getJobDetail(jobId);
        const filteredJob = shallowCopier.filterProperties(jobResult, Job.viewOutput);
        responseHelper.sendSuccessResponse(res, "Get Job Detail Successful", filteredJob);
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to get job detail: ${e}`]);   
    }
}

const getJobDetailHandlers = [
    getJobDetail
];

async function updateJob(req,res,next) {
    try {
        if (req.session.adminid) {
            const jobId = req.params.id; 
            const newJob = shallowCopier.filterProperties(req.body, Job.updateInput);
            await jobUsecase.updateJob(jobId, newJob, req.session.adminid);
            responseHelper.sendSuccessResponse(res, "Update Job Successful", {});
        } else {
            responseHelper.sendErrorResponse(res, 401, [`Unable to update job: Only logged in admin can update job`]); 
        }
    } catch (e) {
        console.error(e.message);
        responseHelper.sendErrorResponse(res, 400, [`Unable to update job: ${e}`]);   
    }
}

const updateJobHandlers = [
    updateJob
];


const router = express.Router();

router.route('/create').post(...createHandlers);
router.route('/').get(...getListOfJobHandlers);
router.route('/:id').get(...getJobDetailHandlers);
router.route('/:id').put(...updateJobHandlers);

module.exports = router;