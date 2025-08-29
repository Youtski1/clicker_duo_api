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
const repository_1 = __importDefault(require("../repository"));
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = __importDefault(require("../../../database/models/user"));
const duo_1 = __importDefault(require("../../../database/models/duo"));
class UserRepository extends repository_1.default {
    getData(telegram_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.select()
                .from(user_1.default)
                .where((0, drizzle_orm_1.eq)(user_1.default.telegram_id, telegram_id));
            if (user.length)
                return user[0];
        });
    }
    upsert(telegram_id, full_name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getData(telegram_id);
            if (!user) {
                yield this.db.insert(user_1.default)
                    .values({
                    telegram_id: telegram_id,
                    full_name: full_name,
                    username: username
                });
            }
            else {
                yield this.db.update(user_1.default)
                    .set({
                    full_name: full_name,
                    username: username
                })
                    .where((0, drizzle_orm_1.eq)(user_1.default.telegram_id, telegram_id));
            }
        });
    }
    addFeathers(telegram_id, feathers) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update(user_1.default)
                .set({
                feathers: feathers
            })
                .where((0, drizzle_orm_1.eq)(user_1.default.telegram_id, telegram_id));
        });
    }
    upgradeDamage(telegram_id, feathers_count) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update(user_1.default)
                .set({
                feathers: (0, drizzle_orm_1.sql) `${user_1.default.feathers} - ${feathers_count}`
            })
                .where((0, drizzle_orm_1.eq)(user_1.default.telegram_id, telegram_id));
        });
    }
    getTopUsersByLevel() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.db.select({
                full_name: user_1.default.full_name,
                level: duo_1.default.level
            })
                .from(user_1.default)
                .leftJoin(duo_1.default, (0, drizzle_orm_1.eq)(duo_1.default.owner_id, user_1.default.telegram_id))
                .orderBy((0, drizzle_orm_1.desc)(duo_1.default.level));
            return users;
        });
    }
}
exports.default = UserRepository;
