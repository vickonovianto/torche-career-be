const argon2 = require('argon2');

const userRepository = require('../database/mongodb/repository/user.js');

async function createUser(user) {
    try {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        return await userRepository.createUser(user);
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };
