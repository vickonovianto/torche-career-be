const paramInput = {
    in: ['params'],
};

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

const paramStringInput = {
    ...paramInput,
    ...stringInput,
};

const bodyStringInput = {
    ...bodyInput,
    ...stringInput,
};

module.exports = { paramInput, bodyInput, stringInput, bodyStringInput, paramStringInput };
