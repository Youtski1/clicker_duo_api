import Repository from "../repository";
import Duo from "../../../database/models/duo";
import { eq, sql } from "drizzle-orm";


class DuoRepository extends Repository {

    async getData(owner_id: number) {
        const duo = await this.db.select()
        .from(Duo)
        .where(
            eq(Duo.owner_id, owner_id)
        );

        if (duo.length)
            return duo[0]
    }
    
    async insert(owner_id: number) {
        await this.db.insert(Duo)
        .values({
            owner_id: owner_id
        });
    }

    async setStage(
        owner_id: number,
        new_stage: number
    ) {
        await this.db.update(Duo)
        .set({
            stage: new_stage
        })
        .where(
            eq(Duo.owner_id, owner_id)
        );
    }

    async criticalDamage(owner_id: number) {
        await this.db.update(Duo)
        .set({
            stage: 7,
            recovery_time: sql`(NOW() + INTERVAL '6 hours')::date`
        })
        .where(
            eq(Duo.owner_id, owner_id)
        );
    }

    async getAllDuo() {
        const duos = await this.db.select().from(Duo);
        return duos;
    }

    async recovery(
        owner_id: number,
        new_health: number
    ) {
        await this.db.update(Duo)
        .set({
            level: sql`${Duo.level} + 1`,
            stage: 1,
            health: new_health,
            recovery_time: sql`NULL`
        })
        .where(
            eq(Duo.owner_id, owner_id)
        );
    }
}

export default DuoRepository;