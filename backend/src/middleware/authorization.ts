import { Response, Request, NextFunction } from "express";

export default function Authorization (
    request: Request,
        response: Response,
            next: NextFunction,
): void {
    const { authorization } = request.headers;
        !authorization && response.status(401).json({ message: "Unauthorized" });
            next();
}