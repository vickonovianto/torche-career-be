const validation = require('./validation.js');

class User {
    static #collectionName = "users";

    static #inputProperties = [
        'email',
        'password',
    ];

    static #outputProperties = [
        'email',
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

    static #idValidation = {
        ...validation.paramStringInput,
    };

    static #registerValidation = {
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

    static get inputProperties() {
        return this.#inputProperties;
    }

    static get outputProperties() {
        return this.#outputProperties;
    }

    static get registerValidation() {
        return this.#registerValidation;
    }

    static get loginValidation() {
        return this.#loginValidation;
    }

    static get idValidation() {
        return this.#idValidation;
    }
}

module.exports = User;
