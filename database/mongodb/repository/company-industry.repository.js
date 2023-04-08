const dbUtil = require('../db-util.js');
const CompanyIndustry = require('.././model/company-industry.model.js');

async function findByName(inputName) {
    try {
        const companyIndustryCollection = dbUtil.getCollection(CompanyIndustry.collectionName);
        return await companyIndustryCollection.findOne({ name: inputName });
    } catch (e) {
        throw e;
    }
}

module.exports = { findByName };
