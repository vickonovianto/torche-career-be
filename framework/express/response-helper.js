class ErrorResponse {
    constructor(errorCode, errorMessages) {
        this.success = false;
        this.messages = errorMessages;
        this.error_code = errorCode;
        this.data = {};
    }
}

class SuccessResponse {
    constructor(successMessage, data) {
        this.success = true;
        this.message = successMessage;
        this.data = data;
    }
}

function sendErrorResponse(res, errorCode, errorMessages) {
    const errorResponse = new ErrorResponse(errorCode, errorMessages);
    res.status(errorCode).send(errorResponse);
}

function sendSuccessResponse(res, successMessage, data) {
    const successResponse = new SuccessResponse(successMessage, data);
    res.status(200).send(successResponse);
}

module.exports = { sendErrorResponse, sendSuccessResponse };
