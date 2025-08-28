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
require('dotenv').config({ path: "../.env" });
const express_1 = require("express");
const validate_service_1 = __importDefault(require("../services/validate_service"));
const validate_service_2 = require("../services/validate_service");
const BOT_TOKEN = process.env.BOT_TOKEN;
const routerValidate = (0, express_1.Router)();
routerValidate.get("/:telegram_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const telegram_id = req.params.telegram_id;
    const client = yield (0, validate_service_2.initClientRedis)();
    const validate_service = new validate_service_1.default(client);
    const userData = yield validate_service.getInitData(String(telegram_id));
    if (!userData) {
        res.status(404).send("Not found userData");
        return;
    }
    res.status(200).json({ initData: userData });
}));
routerValidate.post("/register_data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const initData = req.body.initData;
    const client = yield (0, validate_service_2.initClientRedis)();
    const validate_service = new validate_service_1.default(client);
    if (!initData) {
        res.status(400).send("not body");
        return;
    }
    if (!BOT_TOKEN) {
        return;
    }
    const validation = validate_service.validation(BOT_TOKEN, initData);
    if (!validation) {
        console.log("fake init data");
        res.status(400).send("fake data");
        return;
    }
    const urlParams = new URLSearchParams(initData);
    const userJson = urlParams.get('user');
    if (userJson) {
        const user = JSON.parse(userJson);
        const telegram_id = user.id;
        yield validate_service.createInitData(telegram_id, initData);
        res.status(200).send("create initData");
    }
}));
exports.default = routerValidate;
