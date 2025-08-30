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
            yield this.duoRepository.insert(owner_id);
        });
    }
    getDuo(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.duoRepository.getData(owner_id);
        });
    }
    damageDuo(owner_id, damage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.duoRepository.damageDuo(owner_id, damage);
        });
    }
    setStageDuo(owner_id, new_stage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.duoRepository.setStage(owner_id, new_stage);
        });
    }
    criticalDamageDuo(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.duoRepository.criticalDamage(owner_id);
        });
    }
    getAllDuo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.duoRepository.getAllDuo();
        });
    }
    recoveryDuo(owner_id, new_health) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.duoRepository.recovery(owner_id, new_health);
        });
    }
}
exports.default = DuoService;
