import config from './knexfile';
import Knex from 'knex';
import { User } from '../domain/user';
import bcrypt from 'bcrypt';

class userRepo {
    private database;
    constructor() {
        this.database = Knex(config['development']);
    }

    async insertUser(user: User, password: string) {
        await this.database('users').insert({ username: user.username, password: password, admin: user.admin });
    }

    async existingUser(username: string) {
        const existingUser = await this.database('users').where({ username }).first();
        if (existingUser) {
            return existingUser;
        } else {
            return;
        }
    }

    async checkPassword(username: string, password: string) {
        const user = await this.database('users').where({ username }).first();
        if (user) {
            return await bcrypt.compare(password, user.password);
        } else {
            return false;
        }
    }

    async promote(username: string) {
        return await this.database.select('*').from('users')
            .where({ username: username }).update({ admin: true });
    }
}

export default userRepo;