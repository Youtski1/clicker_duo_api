"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/model_repositories/user_repository"));
const duo_repository_1 = __importDefault(require("../repositories/model_repositories/duo_repository"));
class BaseService {
    constructor(database) {
        this.userRepository = new user_repository_1.default(database);
        this.duoRepository = new duo_repository_1.default(database);
    }
}
;
exports.default = BaseService;
