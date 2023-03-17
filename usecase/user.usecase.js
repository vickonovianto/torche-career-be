const argon2 = require('argon2');

const userRepository = require('../database/mongodb/repository/user.repository.js');

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

async function loginUser(user) {
    try {
        const userFromDB = await userRepository.getByEmail(user.email);
        if (!userFromDB) {
            throw new Error('email or password is invalid');
        } else {
            const passwordSame = await argon2.verify(userFromDB.password.toString(), user.password);
            if (passwordSame) {
                return userFromDB;
            } else {
                throw new Error('email or password is invalid');
            }
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { registerUser, loginUser };
