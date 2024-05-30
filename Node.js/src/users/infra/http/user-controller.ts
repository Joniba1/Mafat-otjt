import Router from 'koa-router';
import userRepo from '../user-repo';

const database = new userRepo();
const { validateToken } = require('../../../auth/infra/jwt');
const router = new Router();

//GET - Hello 'username', today is: 'date and time'
router.all('/getDate', validateToken, async (ctx) => {

    if (ctx.method !== 'GET') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const { username } = ctx.state.user;
    const user = await database.existingUser(username);

    if (!user) {
        ctx.status = 404;
        ctx.body = { message: 'User was not found' };
        return;
    }

    ctx.status = 200;
    const currentDate = new Date();
    ctx.response.body = { message: `Hello mr ${user.username}, today is: ${currentDate}` };
});

//GET - get a query param and returns its content
router.all('/echo', validateToken, async (ctx) => {

    if (ctx.method !== 'GET') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }
    const msg = ctx.request.query.message;
    if (msg) {
        ctx.status = 200;
        ctx.response.body = { echo: `The message is: ${msg}` };
    } else {
        ctx.status = 400;
        ctx.response.body = { message: `Invalid message` };
    }
});

export default router;