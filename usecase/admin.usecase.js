const argon2 = require('argon2');

const adminRepository = require('../database/mongodb/repository/admin.repository.js');
const companyEmployeesCountRepository = require('../database/mongodb/repository/company-employees-count.repository.js');
const companyIndustryRepository = require('../database/mongodb/repository/company-industry.repository.js');

async function registerAdmin(admin) {
    try {
        const hash = await argon2.hash(admin.password);
        admin.password = hash;
        const adminWithSameEmail = await adminRepository.getByEmail(admin.email);
        if (!adminWithSameEmail) {
            const adminWithSamePhoneNumber = await adminRepository.getByPhoneNumber(admin.phoneNumber);
            if (!adminWithSamePhoneNumber) {
                const companyIndustry = await companyIndustryRepository.findByName(admin.companyIndustry);
                if (!companyIndustry) {
                    throw new Error('company industry not valid');
                }
                const companyEmployeesCount = await companyEmployeesCountRepository.findByCategory(admin.companyEmployeesCount);
                if (!companyEmployeesCount) {
                    throw new Error('company employees count not valid');
                }
                return await adminRepository.create(admin);
            } else {
                throw new Error('phone number already exists');
            }
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
