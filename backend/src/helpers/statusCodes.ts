export default class Helper extends Error {
    status: number;
    success: boolean;
    constructor(message: string, status: number, success: boolean) {
        super(message);
        this.status = status;
        this.success = success 
    }
}

export class NotFound extends Helper {
    constructor(message: string) {
        super(message, 404, false);
    }
}

export class BadRequest extends Helper {
    constructor(message: string) {
        super(message, 400, false);
    }
}

export class Conflict extends Helper {
    constructor(message: string) {
        super(message, 409, false);
    }
}

export class Unauthorized extends Helper {
    constructor(message: string) {
        super(message, 401, false);
    }
}

export class TooManyRequests extends Helper {
    constructor(message: string) {
        super(message, 429, false);
    }
}