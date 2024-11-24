import jwt from 'jsonwebtoken';

const generatePrivateToken = () => {
    const secret = process.env.PRIVATE_TOKEN_SECRET || 'default-private-secret';
    return jwt.sign({scope: 'private'}, secret, {expiresIn: '1y'})
}
