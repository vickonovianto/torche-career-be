class CompanyIndustry {
    static #collectionName = "company_industries";

    static get collectionName() {
        return this.#collectionName;
    }
}

module.exports = CompanyIndustry;
