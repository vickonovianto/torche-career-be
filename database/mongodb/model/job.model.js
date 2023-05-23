const validation = require('./validation.js');

class Job {
    static #collectionName = "jobs";

    static #createInput = [
        'jobTitle',
        'jobType',
        'jobIndustry',
        'jobLocationProvince',
        'jobLocationCity',
        'jobLocationDistrict',
        'jobDescription',
        'jobApplicationDeadline',
        'jobOpenStatus',
        'jobWfoStatus',
        'jobSalary',
    ];

    static #updateInput = [
        'jobTitle',
        'jobType',
        'jobIndustry',
        'jobLocationProvince',
        'jobLocationCity',
        'jobLocationDistrict',
        'jobDescription',
        'jobApplicationDeadline',
        'jobOpenStatus',
        'jobWfoStatus',
        'jobSalary',
    ];

    static #viewOutput = [
        '_id',
        'jobAdminId',
        'jobTitle',
        'jobType',
        'jobIndustry',
        'jobLocationProvince',
        'jobLocationCity',
        'jobLocationDistrict',
        'jobDescription',
        'jobApplicationDeadline',
        'jobOpenStatus',
        'jobWfoStatus',
        'jobSalary',
        'jobLastUpdated'
    ];

    // validation using "express-validator" npm package

    static #jobTitleValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobTypeValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobIndustryValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobLocationProvinceValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobLocationCityValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobLocationDistrictValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobDescriptionValidation = {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 1000,
            },
            errorMessage: 'maximum 1000 characters',
        },
    };

    static #jobApplicationDeadlineValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobOpenStatusValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobWfoStatusValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobSalaryValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #jobLastUpdatedValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #createValidation = {
        jobTitle: this.#jobTitleValidation,
        jobType: this.#jobTypeValidation,
        jobIndustry: this.#jobIndustryValidation,
        jobLocationProvince: this.#jobLocationProvinceValidation,
        jobLocationCity: this.#jobLocationCityValidation,
        jobDescription: this.#jobDescriptionValidation,
        jobApplicationDeadline: this.#jobApplicationDeadlineValidation,
        jobOpenStatus: this.#jobOpenStatusValidation,
        jobWfoStatus: this.#jobWfoStatusValidation,
        jobSalary: this.#jobSalaryValidation,
        jobLastUpdated: this.#jobLastUpdatedValidation,
    };

    constructor() {}

    static get collectionName() {
        return this.#collectionName;
    }

    static get createInput() {
        return this.#createInput;
    }

    static get createValidation() {
        return this.#createValidation;
    }

    static get viewOutput() {
        return this.#viewOutput;
    }

    static get updateInput() {
        return this.#updateInput;
    }
}

module.exports = Job;
