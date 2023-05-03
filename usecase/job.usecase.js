const jobRepository = require('../database/mongodb/repository/job.repository.js');

async function createJob(job) {
    try {
        return await jobRepository.create(job);
    } catch (e) {
        throw e;
    }
}

module.exports = { createJob };
