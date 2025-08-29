import { createClient, RedisClientType } from "redis";
import crypto from "crypto";


const REDIS_URL = process.env.REDIS_URL

export async function initClientRedis(): Promise<RedisClientType>{
    const client: RedisClientType = createClient({ url: REDIS_URL })
    await client.connect()
    return client
}


class ValidateService {

    clientRedis: RedisClientType

    constructor(clientRedis: RedisClientType){
        this.clientRedis = clientRedis
    }

    async createInitData(
        telegram_id: string,
        initData: string
    ){
        await this.clientRedis.set(`${telegram_id}`,initData);
    }

    async getInitData(telegram_id: string){
        return await this.clientRedis.get(`${telegram_id}`);
    }


    async validation(
        botToken: string,
        initData: string
    ){
        try {
            const urlParams = new URLSearchParams(initData);
            const hash = urlParams.get('hash');
        
            if (!hash) {
                console.warn('Telegram initData не содержит hash.');
                return false;
            }
        
            const dataCheckString = Array.from(urlParams.entries())
                .filter(([key, value]) => key !== 'hash')
                .sort()
                .map(([key, value]) => `${key}=${value}`)
                .join('\n');
        
            const hmac = crypto.createHmac('sha256', botToken);
            hmac.update(dataCheckString);
            const expectedHash = hmac.digest('hex');
        
            if (expectedHash !== hash) {
                return false;
            }
        
            console.log('Telegram initData валиден.');
            return true;
    
        } catch (error) {
        console.error('Ошибка при валидации Telegram initData:', error);
        return false;
        }
  }
        
}
export default ValidateService;''