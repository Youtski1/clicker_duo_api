import BaseService from "../service";
import { User } from "../../database/models/user";
import { UserTopLevel } from "../../types/user_top_level";

class UserService extends BaseService {

    async upsertUser(
        telegram_id: number,
        full_name: string,
        username: string,
    ) {

        const user = await this.getUser(telegram_id)

        if (!user){
            await this.db.run(`
                INSERT INTO users(
                    telegram_id,
                    full_name,
                    username
                )
                VALUES(?,?,?)
            `,[telegram_id, full_name, username])  
        }
        else {
            await this.db.run(`
                UPDATE users
                SET full_name = ?, username = ?
                WHERE telegram_id = ?
            `,[full_name, username, telegram_id])
        }

    }

    async getUser(telegram_id: number){
        const user = await this.db.get<User | undefined>(`
            SELECT *
            FROM users
            WHERE telegram_id = ?
        `,[telegram_id]);
        
        if (!user)
            return null;

        return user;
    }


    async addFeathers(
        telegram_id: number,
        feathers: number
    ) {
        await this.db.run(`
            UPDATE users
            SET feathers = feathers + ?
            WHERE telegram_id = ?
        `, [feathers, telegram_id])
    }

    async upgradeDamage(
        telegram_id: number,
        feathers_count: number
    ) {
        await this.db.run(`
            UPDATE users
            SET damage = damage + 1, feathers = feathers - ?
            WHERE telegram_id = ?
        `, [feathers_count, telegram_id])
    }

    async getTopUsersByLevel() {
        const top_users = await this.db.all<UserTopLevel>(`
           SELECT u.full_name, d.level
           FROM users u
           JOIN duos d ON u.telegram_id = d.owner_id
           ORDER BY d.level DESC
        `)
        
        return top_users
    }
    
}

export default UserService;