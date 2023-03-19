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
        const ObjectId = dbUtil.getObjectId();
        return await userCollection.findOne({ _id: new ObjectId(id) });
    } catch (e) {
        throw e;
    }
}

module.exports = { create, getByEmail, getById };
