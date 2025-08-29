import BaseService from "../service";
import User from "../../../database/models/user";
import { UserTopLevel } from "../../types/user_top_level";

class UserService extends BaseService {

    async upsertUser(
        telegram_id: number,
        full_name: string,
        username: string,
    ) {
        await this.userRepository.upsert(
            telegram_id,
            full_name,
            username
        );
    }

    async getUser(telegram_id: number) {
        return await this.userRepository.getData(telegram_id);
    }


    async addFeathers(
        telegram_id: number,
        feathers: number
    ) {
        await this.userRepository.addFeathers(
            telegram_id,
            feathers
        )
    }

    async upgradeDamage(
        telegram_id: number,
        feathers_count: number
    ) {
        await this.userRepository.upgradeDamage(
            telegram_id,
            feathers_count
        )
    }

    async getTopUsersByLevel() {
        return await this.userRepository.getTopUsersByLevel();

    }
    
}

export default UserService;