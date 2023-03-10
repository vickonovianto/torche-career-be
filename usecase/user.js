const userRepository = require('../database/mongodb/repository/user.js');

async function createUser(user) {
    try {
        return await userRepository.createUser(user);
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };
