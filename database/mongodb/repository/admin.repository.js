const dbUtil = require('../db-util.js');
const Admin = require('.././model/admin.model.js');

async function create(admin) {
    try {
        const adminCollection = dbUtil.getCollection(Admin.collectionName);
        return await adminCollection.insertOne(admin);
    } catch (e) {
        throw e;
    }
}

async function getByEmail(email) {
    try {
        const adminCollection = dbUtil.getCollection(Admin.collectionName);
        return await adminCollection.findOne({ email: email });
    } catch (e) {
        throw e;
    }
}

async function getByPhoneNumber(phoneNumber) {
    try {
        const adminCollection = dbUtil.getCollection(Admin.collectionName);
        return await adminCollection.findOne({ phoneNumber: phoneNumber });
    } catch (e) {
        throw e;
    }
}

async function getById(id) {
    try {
        const adminCollection = dbUtil.getCollection(Admin.collectionName);
        const ObjectId = dbUtil.getObjectId();
        return await adminCollection.findOne({ _id: new ObjectId(id) });
    } catch (e) {
        throw e;
    }
}

async function updateProfileById(id, profile) {
    try {
        const adminCollection = dbUtil.getCollection(Admin.collectionName);
        const ObjectID = dbUtil.getObjectId();
        const objectId = new ObjectID(id);
        const filter = { _id: objectId };
        const update = { $set: profile };
        return await adminCollection.updateOne(filter, update);
    } catch (e) {
        throw e;
    }
}

module.exports = { create, getByEmail, getById, getByPhoneNumber, updateProfileById };
