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
const express_1 = require("express");
const user_service_1 = __importDefault(require("../services/model_service/user_service"));
const db_1 = __importDefault(require("../../database/db"));
const routerUser = (0, express_1.Router)();
routerUser.post("/upsert_user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_service = new user_service_1.default(db_1.default);
    const data = req.body;
    if (!data) {
        res.status(400).send("not body request");
        return;
    }
    yield user_service.upsertUser(data.telegram_id, data.full_name, data.username);
    res.status(201).send("update user data");
}));
routerUser.post("/upgrade_damage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_service = new user_service_1.default(db_1.default);
    const data = req.body;
    if (!data) {
        res.status(400).send("not body reqest");
    }
    yield user_service.upgradeDamage(data.telegram_id, data.feathers_count);
    res.status(200).send("successfully upgrade damage");
}));
routerUser.get("/get_top_users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_service = new user_service_1.default(db_1.default);
    const top_users = yield user_service.getTopUsersByLevel();
    console.log("TOP: " + top_users);
    if (!top_users) {
        res.status(404).send("not found users");
        return;
    }
    res.status(200).json({ top_users: top_users });
}));
routerUser.get("/:telegram_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const database_service = new user_service_1.default(db_1.default);
    const telegram_id = req.params.telegram_id;
    const user = yield database_service.getUser(parseInt(telegram_id, 10));
    if (!user) {
        res.status(404).send("Not found user");
        return;
    }
    res.status(200).json({ user: user });
}));
exports.default = routerUser;
