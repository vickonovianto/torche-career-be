class User {
    static #collectionName = "users";

    static #validationSchema = {
        email: {
            exists: {
                errorMessage: 'Email field must exist',
            },
            trim: true,
            isEmail: {
                errorMessage: 'Invalid email format',
            },
            normalizeEmail: true,
            isLength: {
                options: {
                    max: 50,
                },
                errorMessage: 'Email contains maximum 50 characters',
            },
        },
        password: {
            exists: {
                errorMessage: 'Password field must exist',
            },
            trim: true,
            isLength: {
                options: {
                    min: 8,
                    max: 50,
                },
                errorMessage: 'Password contains minimum 8 characters and maximum 50 characters',
            },
        },
        passwordRepeat: {
            exists: {
                errorMessage: 'Password repeat field must exist',
            },
            trim: true,
            isLength: {
                options: {
                    min: 8,
                    max: 50,
                },
                errorMessage: 'Password repeat contains minimum 8 characters and maximum 50 characters',
            },
        },
    };

    constructor() {}

    static get collectionName() {
        return this.#collectionName;
    }

    static get validationSchema() {
        return this.#validationSchema;
    }
}

module.exports = User;
