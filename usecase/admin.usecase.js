const argon2 = require('argon2');

const adminRepository = require('../database/mongodb/repository/admin.repository.js');

async function registerAdmin(admin) {
    try {
        const hash = await argon2.hash(admin.password);
        admin.password = hash;
        const adminWithSameEmail = await adminRepository.getByEmail(admin.email);
        if (!adminWithSameEmail) {
            return await adminRepository.create(admin);
        } else {
            throw new Error('email already exists');
        }
    } catch (e) {
        throw e;
    }
}

async function loginAdmin(admin) {
    try {
        const adminFromDB = await adminRepository.getByEmail(admin.email);
        if (!adminFromDB) {
            throw new Error('email or password is invalid');
        } else {
            const passwordSame = await argon2.verify(adminFromDB.password.toString(), admin.password);
            if (passwordSame) {
                return adminFromDB;
            } else {
                throw new Error('email or password is invalid');
            }
        }
    } catch (e) {
        throw e;
    }
}

async function getAdminById(id) {
    try {
        const adminFromDB = await adminRepository.getById(id);
        return adminFromDB;
    } catch (e) {
        throw e;
    }
}

module.exports = { registerAdmin, loginAdmin, getAdminById };
