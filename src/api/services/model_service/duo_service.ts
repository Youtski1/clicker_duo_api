import BaseService from "../service";


class DuoService extends BaseService {

    async insertDuo(owner_id: number) {
        await this.duoRepository.insert(owner_id);
    }

    async getDuo(owner_id: number) {
        return await this.duoRepository.getData(owner_id)
    }

    async damageDuo(
        owner_id: number,
        damage: number
    ) {
        return await this.duoRepository.damageDuo(
            owner_id,
            damage
        );
    }

    async setStageDuo(
        owner_id: number,
        new_stage: number
    ) {
        await this.duoRepository.setStage(
            owner_id,
            new_stage
        )
    }

    async criticalDamageDuo(owner_id : number) {
        await this.duoRepository.criticalDamage(owner_id)
    }

    async getAllDuo() {
        return await this.duoRepository.getAllDuo();
    }

    async recoveryDuo(
        owner_id: number,
        new_health: number
    ) {
        await this.duoRepository.recovery(
            owner_id,
            new_health
        );
    }
}


export default DuoService