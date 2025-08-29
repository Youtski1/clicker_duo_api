import Repository from "../repository";
import { eq, sql, desc } from "drizzle-orm";

import User from "../../../database/models/user";
import Duo from "../../../database/models/duo";

class UserRepository extends Repository {

    async getData(telegram_id: number) {
        const user = await this.db.select()
        .from(User)
        .where(
            eq(User.telegram_id, telegram_id)
        )
        
        if (user.length)
            return user[0];
    }

    async upsert(
        telegram_id: number,
        full_name: string,
        username: string
    ) {
        const user = await this.getData(telegram_id);
        
        if (!user) {
            await this.db.insert(User)
            .values({
                telegram_id: telegram_id,
                full_name: full_name,
                username: username
            });
        }

        else {
            await this.db.update(User)
            .set({
                full_name: full_name,
                username: username
            })
            .where(
                eq(User.telegram_id, telegram_id)
            );
        }
    }

    async addFeathers(
        telegram_id: number,
        feathers: number
    ) {
        await this.db.update(User)
        .set({
            feathers: feathers
        })
        .where(
            eq(User.telegram_id, telegram_id)
        );
    }

    async upgradeDamage(
        telegram_id: number,
        feathers_count: number
    ) {
        await this.db.update(User)
        .set({
            feathers: sql`${User.feathers} - ${feathers_count}`
        })
        .where(
            eq(User.telegram_id, telegram_id)
        );
    }

    async getTopUsersByLevel() {
        const users = await this.db.select({
            full_name: User.full_name,
            level: Duo.level
        })
        .from(User)
        .leftJoin(
            Duo, eq(Duo.owner_id, User.telegram_id)
        )
        .orderBy(desc(Duo.level))

        return users
    }
}


export default UserRepository;