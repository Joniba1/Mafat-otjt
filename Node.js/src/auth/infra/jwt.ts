import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

import { User } from '../../users/domain/user';

const sign = jwt.sign;
const verify = jwt.verify;

const createTokens = (user: User) => {
    const accessToken = sign(user, "secretkeynotouchy") //ToDo: terminate the token 
    return accessToken;
}

const validateToken = async (ctx: Context, next: Next) => {
    const accessToken = ctx.cookies.get('access-token');

    if (!accessToken) {
        ctx.status = 401;
        ctx.body = { error: "User isn't Authenticated" };
        return;
    }
    try {
        const validToken = verify(accessToken, "secretkeynotouchy");
        if (validToken) {
            ctx.state.authenticated = true;
            ctx.state.user = validToken;
            await next();
            return;
        }

    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: "there was an error" };
        return;
    }
};

module.exports = { createTokens, validateToken };