const validation = require('./validation.js');

class Admin {
    static #collectionName = "admins";

    static #loginInput = [
        'email',
        'password',
    ];

    static #registerInput = [
        'fullName',
        'email',
        'password',
        'phoneNumber',
        'companyName',
        'companyDescription',
        'companyIndustry',
        'companyEmployeesCount',
        'companyAddress',
        'companyWebsite',
    ];

    static #profileOutput = [
        'fullName',
        'email',
        'phoneNumber',
        'companyName',
        'companyDescription',
        'companyIndustry',
        'companyEmployeesCount',
        'companyAddress',
        'companyWebsite',
    ];

    // validation using "express-validator" npm package

    static #fullNameValidation =  {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: 'minimum 1 character and maximum 50 characters',
        },
    };

    static #emailValidation =  {
        ...validation.requiredBodyStringInput,
        isEmail: {
            errorMessage: 'invalid format',
        },
        normalizeEmail: true,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #passwordValidation = {
        ...validation.requiredBodyStringInput,
        isStrongPassword: {
            errorMessage: 'minimum 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
        },
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #passwordRepeatValidation = {
        ...this.#passwordValidation,
    };

    static #phoneNumberValidation = {
        ...validation.requiredBodyStringInput,
        isMobilePhone: {
            locale: 'id-ID',
            errorMessage: 'invalid format',
        },
    };

    static #companyNameValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: 'minimum 1 character and maximum 50 characters',
        },
    };

    static #companyDescriptionValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 255,
            },
            errorMessage: 'minimum 1 character and maximum 255 characters',
        },
    };

    static #companyIndustryValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: 'minimum 1 character and maximum 50 characters',
        },
    };

    static #companyEmployeesCountValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: 'minimum 1 character and maximum 50 characters',
        },
    };

    static #companyAddressValidation = {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 255,
            },
            errorMessage: 'minimum 1 character and maximum 255 characters',
        },
    };

    static #companyWebsiteValidation = {
        ...validation.bodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 255,
            },
            errorMessage: 'minimum 1 character and maximum 255 characters',
        },
    };

    static #registerValidation = {
        fullName: this.#fullNameValidation,
        email: this.#emailValidation,
        password: this.#passwordValidation,
        passwordRepeat: this.#passwordRepeatValidation,
        phoneNumber: this.#phoneNumberValidation,
        companyName: this.#companyNameValidation,
        companyDescription: this.#companyDescriptionValidation,
        companyIndustry: this.#companyIndustryValidation,
        companyEmployeesCount: this.#companyEmployeesCountValidation,
        companyAddress: this.#companyAddressValidation,
        companyWebsite: this.#companyWebsiteValidation,
    };

    static #loginValidation = {
        email: this.#emailValidation,
        password: this.#passwordValidation,
    };

    constructor() {}

    static get collectionName() {
        return this.#collectionName;
    }

    static get registerInput() {
        return this.#registerInput;
    }

    static get loginInput() {
        return this.#loginInput;
    }

    static get profileOutput() {
        return this.#profileOutput;
    }

    static get registerValidation() {
        return this.#registerValidation;
    }

    static get loginValidation() {
        return this.#loginValidation;
    }
}

module.exports = Admin;
