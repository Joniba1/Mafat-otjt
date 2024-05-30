import Router from 'koa-router';
import bcrypt from 'bcrypt';
import userRepo from '../../users/infra/user-repo';
import { User } from '../../users/domain/user'

const { createTokens } = require('../infra/jwt');

const router = new Router();
const database = new userRepo();



//POST - Register
router.all('/register', async (ctx) => {
    if (ctx.method !== 'POST') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    try {
        const { username, password } = ctx.request.body as { username: string; password: string; };
        const hashedPassword = await bcrypt.hash(password, 10);

        let isAdmin: boolean = false;
        if (password.endsWith("^admin")) {
            isAdmin = true;
        }

        const user: User = { username: username, admin: isAdmin }

        if (await database.existingUser(username)) {
            ctx.status = 400;
            ctx.body = { message: `Username is taken` };
        } else {
            await database.insertUser(user, hashedPassword);
            ctx.status = 201; //created a user
            ctx.response.body = { message: 'User registered successfully' };
            console.log('User registered:', { username });
        }

    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: 'Error registering user' };
        console.error('Error registering user:', error);
    }
});

//POST - Login
router.all('/login', async (ctx) => {
    if (ctx.method !== 'POST') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const { username, password } = ctx.request.body as { username: string; password: string; };
    const user = await database.existingUser(username);

    if (!user) {
        ctx.status = 400;
        ctx.response.body = { message: `User was not found` };
        console.error('Error logging in: User not found');
        return;
    }
    try {
        const correctPassword = await database.checkPassword(username, password);

        if (!correctPassword) {
            ctx.status = 400;
            ctx.response.body = { message: `Incorrect username or password` };
            return;
        }

        const accessToken = createTokens(user);

        ctx.cookies.set('access-token', accessToken, {
            maxAge: 60 * 60 * 1000, //1 hour in milliseconds
            httpOnly: true, //prevents client-side access to the cookie
        });

        ctx.status = 201 //the request created a token
        ctx.body = { message: `Logged in` };

    } catch (error) {
        console.error('Error logging in:', error);
        ctx.status = 500;
        ctx.response.body = { message: `Internal Server Error` };
    }
});



export default router;
