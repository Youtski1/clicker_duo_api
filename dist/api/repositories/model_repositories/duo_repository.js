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
const duo_1 = __importDefault(require("../../../database/models/duo"));
const drizzle_orm_1 = require("drizzle-orm");
class DuoRepository extends repository_1.default {
    getData(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const duo = yield this.db.select()
                .from(duo_1.default)
                .where((0, drizzle_orm_1.eq)(duo_1.default.owner_id, owner_id));
            if (duo.length)
                return duo[0];
        });
    }
    insert(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.insert(duo_1.default)
                .values({
                owner_id: owner_id
            });
        });
    }
    setStage(owner_id, new_stage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update(duo_1.default)
                .set({
                stage: new_stage
            })
                .where((0, drizzle_orm_1.eq)(duo_1.default.owner_id, owner_id));
        });
    }
    criticalDamage(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update(duo_1.default)
                .set({
                stage: 7,
                recovery_time: (0, drizzle_orm_1.sql) `(NOW() + INTERVAL '6 hours')::date`
            })
                .where((0, drizzle_orm_1.eq)(duo_1.default.owner_id, owner_id));
        });
    }
    getAllDuo() {
        return __awaiter(this, void 0, void 0, function* () {
            const duos = yield this.db.select().from(duo_1.default);
            return duos;
        });
    }
    recovery(owner_id, new_health) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update(duo_1.default)
                .set({
                level: (0, drizzle_orm_1.sql) `${duo_1.default.level} + 1`,
                stage: 1,
                health: new_health,
                recovery_time: (0, drizzle_orm_1.sql) `NULL`
            })
                .where((0, drizzle_orm_1.eq)(duo_1.default.owner_id, owner_id));
        });
    }
}
exports.default = DuoRepository;
