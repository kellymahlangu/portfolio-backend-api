import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const generatePublicToken = () => {
    const secret = process.env.PUBLIC_SECRET_KEY || 'default-public-secret';
  return jwt.sign({scope: 'public'}, secret, {expiresIn: '1y'})
}

const generatePrivateToken = () => {
    const secret = process.env.PRIVATE_TOKEN_SECRET || 'default-private-secret';
    return jwt.sign({scope: 'private'}, secret, {expiresIn: '1y'})
}

const validateToken = (token: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const clientToken = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"
        if (!clientToken) return res.status(403).send('No token provided');

        jwt.verify(clientToken, token, (err, decoded) => {
            if (err) return res.status(401).send('Invalid token');
            (req as any).user = decoded; // Attach decoded token data to the request
            next();
        });
    };
};
export const validatePublicToken = validateToken(process.env.PUBLIC_TOKEN_SECRET || 'default-public-secret');
export const validatePrivateToken = validateToken(process.env.PRIVATE_TOKEN_SECRET || 'default-private-secret');