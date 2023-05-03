const dbUtil = require('../db-util.js');
const Job = require('../model/job.model.js');

async function create(job) {
    try {
        const jobCollection = dbUtil.getCollection(Job.collectionName);
        return await jobCollection.insertOne(job);
    } catch (e) {
        throw e;
    }
}

module.exports = { create };
