export class ExpressError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ExpressError;