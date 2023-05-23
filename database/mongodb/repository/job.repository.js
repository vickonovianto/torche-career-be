const dbUtil = require('../db-util.js');
const Job = require('../model/job.model.js');

async function create(job) {
    try {
        const jobCollection = dbUtil.getCollection(Job.collectionName);
        job.jobLastUpdated = new Date().toISOString();
        return await jobCollection.insertOne(job);
    } catch (e) {
        throw e;
    }
}

async function fetch() {
    try {
        const jobCollection = dbUtil.getCollection(Job.collectionName);
        return await jobCollection.find({}).toArray();
    } catch (e) {
        throw e;
    }
}

async function find(id) {
    try {
        const jobCollection = dbUtil.getCollection(Job.collectionName);
        const ObjectID = dbUtil.getObjectId();
        const objectId = new ObjectID(id);
        return await jobCollection.findOne({ _id: objectId });
    } catch (e) {
        throw e;
    }
}

async function update(id, newJob) {
    try {
        const jobCollection = dbUtil.getCollection(Job.collectionName);
        const ObjectID = dbUtil.getObjectId();
        const objectId = new ObjectID(id);
        newJob.jobLastUpdated = new Date().toISOString();
        const filter = { _id: objectId };
        const update = { $set: newJob };
        return await jobCollection.updateOne(filter, update);
    } catch (e) {
        throw e;
    }
}

module.exports = { create, fetch, find, update };
