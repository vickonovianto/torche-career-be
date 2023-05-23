const jobRepository = require('../database/mongodb/repository/job.repository.js');

async function createJob(job) {
    try {
        return await jobRepository.create(job);
    } catch (e) {
        throw e;
    }
}

async function getJobs() {
    try {
        return await jobRepository.fetch();
    } catch (e) {
        throw e;
    }
}

async function getJobDetail(jobId) {
    try {
        return await jobRepository.find(jobId);
    } catch (e) {
        throw e;
    }
}

async function updateJob(jobId, newJob, jobAdminId) {
    try {
        const job = await jobRepository.find(jobId);
        if (job.jobAdminId === jobAdminId) {
            return await jobRepository.update(jobId, newJob);
        } else {
            throw new Error('only admin can update the job');
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { createJob, getJobs, getJobDetail, updateJob };
