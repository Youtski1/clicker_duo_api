import BaseService from "../service";
import { Duo } from "../../database/models/duo";



class DuoService extends BaseService {

    async insertDuo(owner_id: number) {
        await this.db.run(`
            INSERT INTO duos(
                owner_id
            )
            VALUES(?)
        `, [owner_id]);
    }

    async getDuo(owner_id: number) {
        const duo = await this.db.get<Duo | undefined>(`
            SELECT *
            FROM duos
            WHERE owner_id = ?   
        `, [owner_id]);

        if (!duo) 
            return null
        
        return duo
    }

    async damageDuo(
        owner_id: number,
        damage: number
    ) {

        await this.db.run(`
            UPDATE duos
            SET health = health - ?
            WHERE owner_id = ?
        `, [damage, owner_id]);

    }

    async setStageDuo(
        owner_id: number,
        new_stage: number
    ) {
        await this.db.run(`
            UPDATE duos
            SET stage = ?
            WHERE owner_id = ?
        `, [new_stage, owner_id])
    }

    async criticalDamageDuo(owner_id : number) {
        await this.db.run(`
            UPDATE duos
            SET recovery_time = STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME('now', 'localtime', '+6 hours')), stage = 7
            WHERE owner_id = ?
        `, [owner_id])

    }

    async getAllDuo() {
        const duos = await this.db.all<Duo>(`SELECT * FROM duos`)
        return duos
    }

    async recoveryDuo(
        owner_id: number,
        new_health: number
    ) {
        await this.db.run(`
            UPDATE duos
            SET level = level + 1, health = ?, stage = 1, recovery_time = NULL
            WHERE owner_id = ?
        `, [new_health, owner_id])
    }
}


export default DuoService