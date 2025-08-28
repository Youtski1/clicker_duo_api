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
class UserService extends service_1.default {
    upsertUser(telegram_id, full_name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(telegram_id);
            if (!user) {
                yield this.db.run(`
                INSERT INTO users(
                    telegram_id,
                    full_name,
                    username
                )
                VALUES(?,?,?)
            `, [telegram_id, full_name, username]);
            }
            else {
                yield this.db.run(`
                UPDATE users
                SET full_name = ?, username = ?
                WHERE telegram_id = ?
            `, [full_name, username, telegram_id]);
            }
        });
    }
    getUser(telegram_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.get(`
            SELECT *
            FROM users
            WHERE telegram_id = ?
        `, [telegram_id]);
            if (!user)
                return null;
            return user;
        });
    }
    addFeathers(telegram_id, feathers) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE users
            SET feathers = feathers + ?
            WHERE telegram_id = ?
        `, [feathers, telegram_id]);
        });
    }
    upgradeDamage(telegram_id, feathers_count) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`
            UPDATE users
            SET damage = damage + 1, feathers = feathers - ?
            WHERE telegram_id = ?
        `, [feathers_count, telegram_id]);
        });
    }
    getTopUsersByLevel() {
        return __awaiter(this, void 0, void 0, function* () {
            const top_users = yield this.db.all(`
           SELECT u.full_name, d.level
           FROM users u
           JOIN duos d ON u.telegram_id = d.owner_id
           ORDER BY d.level DESC
        `);
            return top_users;
        });
    }
}
exports.default = UserService;
