import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export const validateToken = (token: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = process.env.PRIVATE_TOKEN_SECRET || 'default-private-secret';
        const clientToken = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"
        if (!clientToken) return res.status(403).send('No token provided');

        jwt.verify(clientToken, token, (err, decoded) => {
            if (err) return res.status(401).send('Invalid token');
            (req as any).user = decoded; // Attach decoded token data to the request
            // next();
        });
    };
}