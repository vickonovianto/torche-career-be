const dbUtil = require('../db-util.js');
const User = require('.././model/user.model.js');

async function create(user) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);
        return await userCollection.insertOne(user);
    } catch (e) {
        throw e;
    }
}

async function getByEmail(email) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);
        return await userCollection.findOne({ email: email });
    } catch (e) {
        throw e;
    }
}

async function getById(id) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);
        const ObjectID = dbUtil.getObjectId();
        const objectId = new ObjectID(id);
        return await userCollection.findOne({ _id: objectId });
    } catch (e) {
        throw e;
    }
}

async function updateProfileById(id, profile) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);
        const ObjectID = dbUtil.getObjectId();
        const objectId = new ObjectID(id);
        const filter = { _id: objectId };
        const update = { $set: profile };
        return await userCollection.updateOne(filter, update);
    } catch (e) {
        throw e;
    }
}

module.exports = { create, getByEmail, getById, updateProfileById };
