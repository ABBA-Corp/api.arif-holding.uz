module.exports = class ErrorResponse extends Error {
    static status;
    static message;

    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
};
