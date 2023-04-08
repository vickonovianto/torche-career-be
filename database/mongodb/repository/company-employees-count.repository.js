const dbUtil = require('../db-util.js');
const CompanyEmployeesCount = require('.././model/company-employees-count.model.js');

async function findByCategory(inputCategory) {
    try {
        const companyEmployeesCountCollection = dbUtil.getCollection(CompanyEmployeesCount.collectionName);
        return await companyEmployeesCountCollection.findOne({ category: inputCategory });
    } catch (e) {
        throw e;
    }
}

module.exports = { findByCategory };
