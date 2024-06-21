import Router from 'koa-router';
import Knex from 'knex';
import knexConfig from '../database/knexfile';
import { Task } from '../types';
import { validateToken } from '../auth/jwt';

const database = Knex(knexConfig);
const router = new Router();

router.get('/tasks', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    try {
        const tasks: Task[] = await database('tasks').where({ username, completed: false, relevance: true }).select('*');
        ctx.status = 200;
        ctx.response.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

router.get('/tasks/completed', validateToken, async (ctx) => {
    const username = ctx.state.user.username;
    try {
        const tasks = await database('tasks').where({ username: username, completed: true, relevance: true }).select('*');
        ctx.response.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

router.get('/tasks/irrelevant', validateToken, async (ctx) => {
    const username = ctx.state.user.username;
    try {
        const tasks = await database('tasks').where({ username, relevance: false }).select('*');
        ctx.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});
export default router;

