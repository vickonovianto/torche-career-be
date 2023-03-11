const dbUtil = require('../db-util.js');
const User = require('.././model/user.js');

async function createUser(user) {
    try {
        const userCollection = dbUtil.getCollection(User.collectionName);

        const userWithSameEmail = await userCollection.findOne({ email: user.email });
        if (!userWithSameEmail) {
            return await userCollection.insertOne(user);
        } else {
            throw new Error('email already exists');
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };
