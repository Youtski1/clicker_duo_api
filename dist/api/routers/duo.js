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
const duo_service_1 = __importDefault(require("../services/model_service/duo_service"));
const user_service_1 = __importDefault(require("../services/model_service/user_service"));
const db_1 = __importDefault(require("../../database/db"));
const routerDuo = (0, express_1.Router)();
routerDuo.post("/new_duo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const duo_service = new duo_service_1.default(db_1.default);
    if (!data) {
        res.send("not body").status(500);
        return;
    }
    ;
    const duo = yield duo_service.getDuo(data.owner_id);
    if (duo) {
        res.send("already duo").status(400);
        return;
    }
    ;
    yield duo_service.insertDuo(data.owner_id);
    res.send("register duo").status(201);
}));
routerDuo.post("/damage_duo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const duo_service = new duo_service_1.default(db_1.default);
    const user_service = new user_service_1.default(db_1.default);
    const user = yield user_service.getUser(data.owner_id);
    const duo = yield duo_service.getDuo(data.owner_id);
    if (!user) {
        res.status(500).send("Not user data");
        return;
    }
    if (!duo) {
        res.status(500).send("Not duo data");
        return;
    }
    let damage = 40 * user.damage;
    let feathers = 40 * user.damage;
    if ((duo === null || duo === void 0 ? void 0 : duo.health) - 40 < 0) {
        damage = duo.health;
    }
    if (duo.stage == 6) {
        feathers *= 2;
    }
    yield duo_service.damageDuo(data.owner_id, damage);
    yield user_service.addFeathers(data.owner_id, feathers);
    res.status(200).send("successfully demage do duo");
}));
routerDuo.post("/set_stage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const duo_service = new duo_service_1.default(db_1.default);
    yield duo_service.setStageDuo(data.owner_id, data.new_stage);
    res.status(200).send("successfully set stage duo");
}));
routerDuo.post("/critical_damage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const duo_service = new duo_service_1.default(db_1.default);
    yield duo_service.criticalDamageDuo(data.owner_id);
    res.status(200).send("successfully critical damage duo");
}));
routerDuo.get("/get_all_duo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const duo_service = new duo_service_1.default(db_1.default);
    const duos = yield duo_service.getAllDuo();
    if (!duos) {
        res.status(404).send("Not found data all duo");
        return;
    }
    res.status(200).json({ duos: duos });
}));
routerDuo.post("/recovery_duo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const duo_service = new duo_service_1.default(db_1.default);
    const duo = yield duo_service.getDuo(data.owner_id);
    if (!duo) {
        res.status(404).send("Not found data duo");
        return;
    }
    const new_health = 850 + 350 * (duo.level + 1);
    yield duo_service.recoveryDuo(duo.owner_id, new_health);
    res.status(200).send("Duo successfully recovery");
}));
routerDuo.get("/:owner_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner_id = parseInt(req.params.owner_id);
    const duo_service = new duo_service_1.default(db_1.default);
    const duo = yield duo_service.getDuo(owner_id);
    if (!duo) {
        res.status(404).send("not found duo");
        return;
    }
    res.status(200).json({ duo: duo });
}));
exports.default = routerDuo;
