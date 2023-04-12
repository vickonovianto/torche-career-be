const argon2 = require('argon2');

const User = require('../database/mongodb/model/user.model.js');
const userRepository = require('../database/mongodb/repository/user.repository.js');

async function registerUser(user) {
    try {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        const userWithSameEmail = await userRepository.getByEmail(user.email);
        if (!userWithSameEmail) {
            const userWithDefaultValues = {...user};
            User.basicProfileOutput.forEach(property => {
                if (!userWithDefaultValues.hasOwnProperty(property)) {
                    userWithDefaultValues[property] = "";
                }
            });
            return await userRepository.create(userWithDefaultValues);
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

async function getUserById(id) {
    try {
        const userFromDB = await userRepository.getById(id);
        return userFromDB;
    } catch (e) {
        throw e;
    }
}

module.exports = { registerUser, loginUser, getUserById };
