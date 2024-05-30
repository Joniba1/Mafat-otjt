import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import auth from './auth/auth';
import tasks from './tasks/tasks.controller';
import tasksUtilities from './tasks/tasks-utilities.controller';
import helmet from 'koa-helmet';
import { initializeDatabase } from './database/initializeDatabase';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const api_port = process.env.API_PORT;
const base_url = process.env.BASE_URL;
const frontend_port = process.env.FRONTEND_PORT;

initializeDatabase()
  .then(() => {
    app.use(helmet());
    app.use(bodyParser());
    app.use(cors({
      origin: `${base_url}${frontend_port}`,
      credentials: true,
    }));

    app.use(auth.routes());
    app.use(tasks.routes());
    app.use(tasksUtilities.routes());

    app.listen(api_port, () => {
      console.log(`Server is running at ${base_url}${api_port}`);
    });

    app.on('error', (err, ctx) => {
      console.error('Server error', err, ctx);
    });
  })
  .catch((error) => {
    console.error('Initialization error:', error);
  });
