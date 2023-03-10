const dbUtil = require('../db-util.js');
const userModel = require('.././model/user.js');

async function createUser(user) {
    try {
        const userCollection = dbUtil.getCollection(userModel.collectionName);
        return await userCollection.insertOne(user);
    } catch (e) {
        throw new Error(`Unable to create user: ${e}`);
    }
}

module.exports = { createUser };
