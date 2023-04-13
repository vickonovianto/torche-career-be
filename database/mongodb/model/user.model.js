const validation = require('./validation.js');

class User {
    static #collectionName = "users";

    static #loginInput = [
        'email',
        'password',
    ];

    static #registerInput = [
        'fullName',
        'email',
        'password',
    ];

    static #basicProfile = [
        'fullName',
        'jobTitle',
        'language',
        'dateOfBirth',
        'gender',
        'currentSalary',
        'expectedSalary',
        'description',
        'phoneNumber',
        'email',
        'country',
        'city',
        'address',
    ];

    // validation using "express-validator" npm package

    static #fullNameValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #emailValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
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
        ...validation.requiredNotEmptyBodyStringInput,
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
        custom: {
            options: (value, { req }) => {
                return value === req.body.password;
            },
            errorMessage: 'must be the same as password',
        },
    };

    static #jobTitleValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #languageValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #dateOfBirthValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isDate: {
            format: 'YYYY-MM-DD',
            strictMode: true,
            delimiters: ['-'],
            errorMessage: 'date must be valid and has format YYYY-MM-DD',
        },
        custom: {
            options: (value, { req }) => {
                const dateInput = new Date(value);
                const todayDate = new Date();
                return dateInput < todayDate;
            },
            errorMessage: 'must be less than today\'s date',
        },
    };

    static #genderValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 1,
            },
            errorMessage: 'maximum 1 character',
        },
        custom: {
            options: (value, {}) => {
                return (value === "M") || (value === "F");
            },
            errorMessage: 'only character M or F is allowed'
        },
    };

    static #currentSalaryValidation =  {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 15,
            },
            errorMessage: 'maximum 15 characters',
        },
        isNumeric: {
            no_symbols: true,
            errorMessage: 'invalid numeric string'
        },
    };

    static #expectedSalaryValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 15,
            },
            errorMessage: 'maximum 15 characters',
        },
        isNumeric: {
            no_symbols: true,
            errorMessage: 'invalid numeric string'
        },
    };

    static #descriptionValidation =  {
        ...validation.requiredBodyStringInput,
        isLength: {
            options: {
                max: 500,
            },
            errorMessage: 'maximum 500 characters',
        },
    };

    static #phoneNumberValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isMobilePhone: {
            locale: 'id-ID',
            strictMode: true,
            errorMessage: 'phone number must be valid and start with + and country code',
        },
    };

    static #countryValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #cityValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: 'maximum 50 characters',
        },
    };

    static #addressValidation =  {
        ...validation.requiredNotEmptyBodyStringInput,
        isLength: {
            options: {
                max: 255,
            },
            errorMessage: 'maximum 255 characters',
        },
    };

    static #registerValidation = {
        fullName: this.#fullNameValidation,
        email: this.#emailValidation,
        password: this.#passwordValidation,
        passwordRepeat: this.#passwordRepeatValidation,
    };

    static #loginValidation = {
        email: this.#emailValidation,
        password: this.#passwordValidation,
    };

    static #updateProfileValidation = {
        fullName: this.#fullNameValidation,
        jobTitle: this.#jobTitleValidation,
        language: this.#languageValidation,
        dateOfBirth: this.#dateOfBirthValidation,
        gender: this.#genderValidation,
        currentSalary: this.#currentSalaryValidation,
        expectedSalary: this.#expectedSalaryValidation,
        description: this.#descriptionValidation,
        phoneNumber: this.#phoneNumberValidation,
        email: this.#emailValidation,
        country: this.#countryValidation,
        city: this.#cityValidation,
        address: this.#addressValidation,
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

    static get basicProfile() {
        return this.#basicProfile;
    }

    static get registerValidation() {
        return this.#registerValidation;
    }

    static get loginValidation() {
        return this.#loginValidation;
    }

    static get updateProfileValidation() {
        return this.#updateProfileValidation;
    }
}

module.exports = User;
