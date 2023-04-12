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

const notEmptyInput = {
    notEmpty: {
        errorMessage: 'field must not be empty',
    },
};

const bodyStringInput = {
    ...bodyInput,
    ...stringInput,
};

const notEmptyBodyStringInput = {
    ...bodyStringInput,
    ...notEmptyInput,
};  

const requiredBodyStringInput = {
    ...requiredInput,
    ...bodyStringInput,
};

const requiredNotEmptyBodyStringInput = {
    ...requiredBodyStringInput,
    ...notEmptyInput,
};

module.exports = { bodyInput,
    stringInput,
    bodyStringInput,
    notEmptyBodyStringInput,
    requiredBodyStringInput,
    requiredNotEmptyBodyStringInput };
