const validation = require('./validation.js');

class User {
    static #collectionName = "users";

    static #properties = [
        'email',
        'password',
    ];

    // validation using "express-validator" npm package

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
        isLength: {
            options: {
                min: 8,
                max: 50,
            },
            errorMessage: 'minimum 8 characters and maximum 50 characters',
        },
    };

    static #passwordRepeatValidation = {
        ...this.#passwordValidation,
    };

    static #registerValidation = {
        email: this.#emailValidation,
        password: this.#passwordValidation,
        passwordRepeat: this.#passwordRepeatValidation,
    };

    constructor() {}

    static get collectionName() {
        return this.#collectionName;
    }

    static get properties() {
        return this.#properties;
    }

    static get registerValidation() {
        return this.#registerValidation;
    }
}

module.exports = User;
