import Koa from 'koa';
import Knex from 'knex';
import bodyParser from 'koa-bodyparser';

//Files
import config from './users/infra/knexfile';
import arrayController from './array/infra/http/array-controller';
import restrictedArrayController from './array/infra/http/restricted-array-controller';
import userController from './users/infra/http/user-controller';
import restrictedUserController from './users/infra/http/restricted-user-controller';
import auth from './auth/domain/auth';

const app = new Koa();
const database = Knex(config['development']);


app.use(bodyParser());
app.use(arrayController.routes());
app.use(restrictedArrayController.routes());
app.use(userController.routes());
app.use(restrictedUserController.routes());
app.use(auth.routes());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

database.raw('SELECT 1')
  .then(() => {
    console.log('Database connection was successful');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

