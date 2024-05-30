import Router from 'koa-router';
import { arrayRepo } from '../array-repo';

const { validateToken } = require('../../../auth/infra/jwt');
const router = new Router();


//PUT - replaces index with the given number
router.all('/array/insert/:index', validateToken, async (ctx) => {
    if (ctx.method !== 'PUT') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const user = ctx.state.user;
    const { number } = ctx.request.body as { number: number };
    const index: number = parseInt(ctx.params.index) as number;
    if (user.admin) {
        if (isNaN(number) || isNaN(index)) {
            ctx.status = 400;
            ctx.response.body = { message: `Invalid credentials` };
        } else if (index < 0 || index >= arrayRepo.get().length) {
            ctx.status = 404;
            ctx.response.body = { message: `Index is out of bounds` };
        } else {
            arrayRepo.replace(index, number);
            ctx.status = 200; //Array updated, nothing new was created
            ctx.response.body = { message: arrayRepo.get() };
        }
    } else {
        ctx.status = 403;
        ctx.response.body = { message: `U are not authorized to do this` };
    }
});

//POST - Pushes a given number to the top of the array //admins only
router.all('/array/push', validateToken, async (ctx) => {
    if (ctx.method !== 'POST') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const user = ctx.state.user;
    if (user.admin) {
        const num = parseInt((ctx.request.body as any).number);
        if (!isNaN(num)) {
            ctx.status = 201;
            arrayRepo.push(num);
            ctx.response.body = { message: `The number ${num} has been added to the array` }
        } else {
            ctx.status = 400;
            ctx.response.body = { message: `Invalid number` };
        }
    } else {
        ctx.status = 403;
        ctx.response.body = { message: `U are not authorized to do this` };
    }
});

//DELETE - Removes the top number in the array //admins only
router.all('/array/pop', validateToken, async (ctx) => {
    if (ctx.method !== 'DELETE') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const user = ctx.state.user;
    if (user.admin) {
        if (arrayRepo.get().length > 0) {
            ctx.status = 200;
            ctx.response.body = { message: `Deletion successful` };
            arrayRepo.pop();
        } else {
            ctx.status = 400;
            ctx.response.body = { message: `The array is already empty` };
        }
    } else {
        ctx.status = 403;
        ctx.response.body = { message: `U are not authorized to do this` };
    }

});

//DELETE - Replaces index with 0 //admins only
router.all('/array/replace/:index', validateToken, async (ctx) => {
    if (ctx.method !== 'DELETE') {
        ctx.status = 405;
        ctx.body = { message: `Wrong request type` };
        return;
    }

    const user = ctx.state.user;
    if (user.admin) {
        const index: number = parseInt(ctx.params.index) as number;
        if (isNaN(index)) {
            ctx.status = 400;
            ctx.response.body = { message: `Invalid index` };
        } else if (index >= arrayRepo.get().length) {
            ctx.status = 404;
            ctx.response.body = { message: `Index is out of bounds` }
        } else {
            ctx.status = 200;
            arrayRepo.delete(index);
            ctx.response.body = { message: `Deletion successful` };
        }
    } else {
        ctx.status = 403;
        ctx.response.body = { message: `U are not authorized to do this` };
    }
});

export default router;