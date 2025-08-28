"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClientRedis = initClientRedis;
const redis_1 = require("redis");
const crypto_1 = __importDefault(require("crypto"));
const REDIS_URL = process.env.REDIS_URL;
function initClientRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, redis_1.createClient)({ url: REDIS_URL });
        yield client.connect();
        return client;
    });
}
class ValidateService {
    constructor(clientRedis) {
        this.clientRedis = clientRedis;
    }
    createInitData(telegram_id, initData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clientRedis.set(`${telegram_id}`, initData);
        });
    }
    getInitData(telegram_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientRedis.get(`${telegram_id}`);
        });
    }
    validation(botToken, initData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const hmac = crypto_1.default.createHmac('sha256', botToken);
                hmac.update(dataCheckString);
                const expectedHash = hmac.digest('hex');
                if (expectedHash !== hash) {
                    return false;
                }
                console.log('Telegram initData валиден.');
                return true;
            }
            catch (error) {
                console.error('Ошибка при валидации Telegram initData:', error);
                return false;
            }
        });
    }
}
exports.default = ValidateService;
