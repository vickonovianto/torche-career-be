const bodyInput = {
    in: ['body'],
};

const stringInput = {
    exists: {
        errorMessage: 'field must exist',
    },
    isString: {
        errorMessage: 'field must be string',
    },
    trim: true,
};

const bodyStringInput = {
    ...bodyInput,
    ...stringInput,
};

module.exports = { bodyInput, stringInput, bodyStringInput };
