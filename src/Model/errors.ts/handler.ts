import { ErrorHandler } from "./status.ts";
import { Request, Response, NextFunction } from "express";

export default function HandleError(
    error: ErrorHandler,
    request: Request,
    response: Response, 
    next: NextFunction,
) {
    const status = error.status != 500 ? error.status : 500;
    const message = status != 500 ? error.message : "Ops! Something went wrong!";

    status === 500 && console.log(error);
    response.status(status).json({message, success: error.success});
}