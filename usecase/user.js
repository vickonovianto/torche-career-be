const argon2 = require('argon2');

const userRepository = require('../database/mongodb/repository/user.js');

async function createUser(user) {
    try {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        const userWithSameEmail = await userRepository.getUserByEmail(user.email);
        if (!userWithSameEmail) {
            return await userRepository.createUser(user);
        } else {
            throw new Error('email already exists');
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };
