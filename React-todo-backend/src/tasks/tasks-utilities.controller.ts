import Router from 'koa-router'
import Knex from 'knex';
import knexConfig from '../database/knexfile';
import { validateToken } from '../auth/jwt';
import { Task } from '../types';


const database = Knex(knexConfig);
const router = new Router();

router.put('/tasks/edit', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { title, updatedTask } = ctx.request.body as { title: string, updatedTask: Task };
    try {
        const existingTask: Task = await database('tasks').where({ username: username, title: updatedTask.title }).first();

        if (existingTask && existingTask.title != title) {
            ctx.status = 400;
            ctx.response.body = { errorCode: 'DUPLICATE_TASKS' }
            return;
        }

        const task: Task = await database('tasks').where({ username: username, title: title }).first();

        if (!task) {
            ctx.status = 404;
            ctx.response.body = { message: 'Task not found' };
            return;
        }

        const response = await database('tasks').where({ username, title })
            .update(updatedTask);
        ctx.status = 200;
        ctx.response.body = response;
    } catch (error) {
        ctx.status = 500;
        ctx.response.body = { message: 'Error updating task', error };
    }
});

router.post('/tasks/add', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { title, description } = ctx.request.body as { title: string, description: string };
    let { deadline } = ctx.request.body as { deadline: string | null };

    if (title === '') {
        ctx.status = 400;
        ctx.response.body = { errorCode: "EMPTY_TITLE" };
        return;
    }
    if (deadline === '') {
        deadline = null;
    }

    try {
        const existingTask: Task = await database('tasks').where({ username: username, title: title }).first();

        if (existingTask) {
            ctx.status = 400;
            ctx.response.body = { errorCode: 'DUPLICATE_TASKS' }
            return;
        }

        await database('tasks').insert({ username, title, deadline, description });
        ctx.status = 201;
        ctx.response.body = 'Task added successfully';
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.response.body = 'Error adding task';
    }
});

router.delete('/tasks/delete', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { title } = ctx.request.body as { title: string };

    try {
        const result: number = await database('tasks').where({ username: username, title: title }).del();
        if (result === 0) {
            ctx.status = 404;
            ctx.response.body = { message: 'Task not found' };
        } else {
            ctx.status = 200;
            ctx.response.body = { message: 'Task deleted successfully' };
        }
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.response.body = { message: `There was an error: ${error}` };
    }
});

router.get('/tasks/search', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { searchReq } = ctx.request.query as { searchReq: string };

    if (!username) {
        ctx.status = 400;
        ctx.response.body = { errorCode: 'INVALID_USERNAME' };
        return;
    }

    if (!searchReq) {
        ctx.status = 200;
        ctx.response.body = [];
        return;
    }

    try {
        const tasks: Task[] = await database('tasks').where({ username }).select('*');

        // const filteredTasks = tasks.filter(task =>
        //     task.title.startsWith(searchReq) || task.description.startsWith(searchReq)
        // );

        const filteredTasks = tasks.filter(task =>
            task.title.includes(searchReq) || task.description.includes(searchReq)
        );

        if (filteredTasks.length === 0) {
            ctx.status = 200;
            ctx.response.body = [];
        } else {
            ctx.status = 200;
            ctx.response.body = filteredTasks;
        }

    } catch (error) {
        ctx.status = 500;
        ctx.response.body = `Internal server error: ${error}`;
    }
});

router.post('/tasks/complete', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { title } = ctx.request.body as { title: string };

    const taskExist: Task = await database('tasks').where({ username: username, title: title }).first();

    if (!taskExist) {
        ctx.status = 404;
        ctx.response.body = `Task doesn't exist!`;
        return;
    }

    try {
        await database('tasks').where({ username: username, title: title }).update({ completed: !taskExist.completed });
        ctx.status = 200;
        ctx.response.body = `Completion status was changed`;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.response.body = `There was an error ${error}`;
    }
});

router.post('/tasks/relevance', validateToken, async (ctx) => {
    const username: string = ctx.state.user.username;
    const { title } = ctx.request.body as { title: string };

    const taskExist: Task = await database('tasks').where({ username, title }).first();

    if (!taskExist) {
        ctx.status = 404;
        ctx.response.body = `Task doesn't exist!`;
        return;
    }

    try {
        await database('tasks').where({ username, title }).update({ relevance: !taskExist.relevance });
        ctx.status = 200;
        ctx.response.body = `Task relevance was changed`;
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.response.body = `There was an error ${error}`;
    }
});

export default router;
