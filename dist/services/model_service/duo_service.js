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
const service_1 = __importDefault(require("../service"));
class DuoService extends service_1.default {
    insertDuo(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            INSERT INTO duos(
                owner_id
            )
            VALUES(?)
        `, [owner_id]);
        });
    }
    getDuo(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const duo = yield this.db.get(`
            SELECT *
            FROM duos
            WHERE owner_id = ?   
        `, [owner_id]);
            if (!duo)
                return null;
            return duo;
        });
    }
    damageDuo(owner_id, damage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE duos
            SET health = health - ?
            WHERE owner_id = ?
        `, [damage, owner_id]);
        });
    }
    setStageDuo(owner_id, new_stage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE duos
            SET stage = ?
            WHERE owner_id = ?
        `, [new_stage, owner_id]);
        });
    }
    criticalDamageDuo(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE duos
            SET recovery_time = STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME('now', 'localtime', '+6 hours')), stage = 7
            WHERE owner_id = ?
        `, [owner_id]);
        });
    }
    getAllDuo() {
        return __awaiter(this, void 0, void 0, function* () {
            const duos = yield this.db.all(`SELECT * FROM duos`);
            return duos;
        });
    }
    recoveryDuo(owner_id, new_health) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE duos
            SET level = level + 1, health = ?, stage = 1, recovery_time = NULL
            WHERE owner_id = ?
        `, [new_health, owner_id]);
        });
    }
}
exports.default = DuoService;
