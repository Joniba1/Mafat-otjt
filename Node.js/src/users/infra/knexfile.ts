import { Knex } from 'knex';

interface KnexConfig extends Knex.Config {
  development: Knex.Config;
}

const config: KnexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'joanb',
      password: 'Aa123456',
      port: 5432,
      database: 'node.js'
    }
  },
};

export default config;
