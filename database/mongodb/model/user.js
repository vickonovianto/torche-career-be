class User {
    static #collectionName = "users";
    static #properties = [
        'email',
        'password',
    ];

    // validation using "express-validator" npm package
    static #validationSchema = {
        email: {
            in: ['body'],
            exists: {
                errorMessage: 'Email field must exist',
            },
            isString: {
                errorMessage: 'Email field must be string',
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
            in: ['body'],
            exists: {
                errorMessage: 'Password field must exist',
            },
            isString: {
                errorMessage: 'Password field must be string',
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
            in: ['body'],
            exists: {
                errorMessage: 'Password repeat field must exist',
            },
            isString: {
                errorMessage: 'Password field must be string',
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

    static get properties() {
        return this.#properties;
    }

    static get validationSchema() {
        return this.#validationSchema;
    }
}

module.exports = User;
