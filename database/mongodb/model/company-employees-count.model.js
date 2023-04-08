class CompanyEmployeesCount {
    static #collectionName = "company_employees_counts";

    static get collectionName() {
        return this.#collectionName;
    }
}

module.exports = CompanyEmployeesCount;
