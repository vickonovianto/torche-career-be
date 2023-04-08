const bodyInput = {
    in: ['body'],
};

const requiredInput = {
    exists: {
        errorMessage: 'field must exist',
    },
};

const stringInput = {
    isString: {
        errorMessage: 'field must be string',
    },
    trim: true,
};

const bodyStringInput = {
    ...bodyInput,
    ...stringInput,
};

const requiredBodyStringInput = {
    ...bodyInput,
    ...requiredInput,
    ...stringInput,
};

module.exports = { bodyInput, stringInput, bodyStringInput, requiredBodyStringInput };
