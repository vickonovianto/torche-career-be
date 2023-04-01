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
    ];

    static #profileOutput = [
        'fullName',
        'email',
    ];

    // validation using "express-validator" npm package

    static #fullNameValidation =  {
        ...validation.bodyStringInput,
        isLength: {
            options: {
                min: 1,
                max: 50,
            },
            errorMessage: 'minimum 1 character and maximum 50 characters',
        },
    };

    static #emailValidation =  {
        ...validation.bodyStringInput,
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
        ...validation.bodyStringInput,
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
