const dbUtil = require('../db-util.js');
const User = require('.././model/user.js');

async function createUser(user) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);
        return await userCollection.insertOne(user);
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };
