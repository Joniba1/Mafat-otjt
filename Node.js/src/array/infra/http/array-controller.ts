import Router from 'koa-router';
import { arrayRepo } from '../array-repo';

const { validateToken } = require('../../../auth/infra/jwt');
const router = new Router();

//GET - get an array saved in the memory
router.all('/array', validateToken, async (ctx) => {
  if (ctx.method !== 'GET') {
    ctx.status = 405;
    ctx.body = { message: `Wrong request type` };
    return;
  }

  if (arrayRepo.get()) {
    ctx.response.body = { message: arrayRepo.get() };
    ctx.status = 200;
  } else {
    ctx.response.body = { message: `Array was not found` };
    ctx.status = 404;
  }
});

//GET - Returns the value of the array at a specific index 
router.all('/array/get/:index', validateToken, async (ctx) => {
  if (ctx.method !== 'GET') {
    ctx.status = 405;
    ctx.body = { message: `Wrong request type` };
    return;
  }

  const index: number = parseInt(ctx.params.index) as number;
  if (isNaN(index)) {
    ctx.status = 400; //the field value is invalid 
    ctx.response.body = { message: `Index is not a number` };
  } else if (index < 0 || index >= arrayRepo.get().length) {
    ctx.status = 404;
    ctx.response.body = { message: `Index is out of bounds` };
  } else {
    ctx.status = 200;
    ctx.response.body = { value: arrayRepo.get()[index] };
  }
});

export default router;
