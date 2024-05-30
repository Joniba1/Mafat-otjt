import Knex from 'knex';
import knexConfig from './knexfile';

const database = Knex(knexConfig);

const createTables = async () => {
  const usersTableExists = await database.schema.hasTable('users');
  const tasksTableExists = await database.schema.hasTable('tasks');

  if (!usersTableExists) {
    await database.schema.createTable('users', (table) => {
      table.string('username', 15).notNullable().primary();
      table.string('password', 60).notNullable();
    });
  }

  if (!tasksTableExists) {
    await database.schema.createTable('tasks', function (table) {
      table.string('username', 15).notNullable();
      table.string('title').notNullable();
      table.boolean('completed').notNullable().defaultTo(false);
      table.boolean('relevance').notNullable().defaultTo(true);
      table.timestamp('deadline');
      table.string('description');
      table.primary(['title', 'username']);
      table.foreign('username').references('username').inTable('users').onDelete('NO ACTION').onUpdate('NO ACTION');
    });
  }
}

export const initializeDatabase = async () => {
  await database.raw('SELECT 1');
  await createTables();
};
