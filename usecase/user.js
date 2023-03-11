const argon2 = require('argon2');

const userRepository = require('../database/mongodb/repository/user.js');

async function registerUser(user) {
    try {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        const userWithSameEmail = await userRepository.getByEmail(user.email);
        if (!userWithSameEmail) {
            return await userRepository.create(user);
        } else {
            throw new Error('email already exists');
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { registerUser };
