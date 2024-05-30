import Router from 'koa-router';
import userRepo from '../user-repo';

const database = new userRepo();

const { validateToken } = require('../../../auth/infra/jwt');

const router = new Router();

//POST - Promote a user
router.all('/admin/promote/:username', validateToken, async (ctx) => {
    if (ctx.method !== 'POST') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const user = ctx.state.user;
    const usernameToPromote = ctx.params.username;
    if (user.admin) {
        const updatedRow = await database.promote(usernameToPromote);
        if (updatedRow === 0) {
            ctx.status = 400;
            ctx.response.body = { message: `user doesnt exist` }
        } else {
            ctx.status = 200;
            ctx.response.body = { message: `${usernameToPromote} was promoted` }
        }
    } else {
        ctx.status = 403;
        ctx.response.body = { message: `U are not authorized to do this` };
    }
});


export default router;
