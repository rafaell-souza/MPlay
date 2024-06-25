export class ErrorHandler extends Error {
    status;
    success;
    constructor(status: number, message: string, success: boolean) {
        super(message);
        this.status = status;
        this.success = success;
    }
}

export class NotFound extends ErrorHandler {
    constructor(message: string) {
        super(404, message, false);
    }
}

export class BadRequest extends ErrorHandler {
    constructor(message: string) {
        super(400, message, false);
    }
}

export class Conflict extends ErrorHandler {
    constructor(message: string) {
        super(409, message, false);
    }
}