import { User } from '../types';
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY as string;


export const generateToken = (user: User) => {
    return jwt.sign({ username: user.username }, JWT_KEY, { expiresIn: '1h' });
};

export const validateToken = async (ctx: Context, next: Next) => {
    const token = ctx.cookies.get('jwt');
    if (!token) {
        ctx.status = 401;
        ctx.response.body = { message: 'Access denied. No token provided.' };
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_KEY);
        ctx.state.user = decoded;
        await next();
    } catch (error) {
        ctx.status = 400;
        ctx.response.body = { message: 'Invalid token.' };
    }
};