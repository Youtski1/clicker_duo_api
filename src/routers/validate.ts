require('dotenv').config({path:"../.env"});

import { Router } from "express";
import {Request, Response} from "express"
import ValidateService from "../services/validate_service";
import { initClientRedis } from "../services/validate_service";
import { readSync } from "fs";


const BOT_TOKEN = process.env.BOT_TOKEN
const routerValidate = Router()



routerValidate.get("/:telegram_id",async (req: Request, res: Response) => {
    const telegram_id = req.params.telegram_id;
    const client = await initClientRedis()
    const validate_service = new ValidateService(client)
    const userData = await validate_service.getInitData(String(telegram_id))
    if (!userData){
        res.status(404).send("Not found userData")
        return 
    }
    res.status(200).json({initData: userData})
})

routerValidate.post("/register_data", async (req: Request, res: Response) => {
    const initData = req.body.initData
    const client = await initClientRedis()
    const validate_service = new ValidateService(client)

    if (!initData){
        res.status(400).send("not body")
        return
    }

    if (!BOT_TOKEN){
        return 
    }
    
    const validation = validate_service.validation(BOT_TOKEN, initData)

    if (!validation){
        console.log("fake init data")
        res.status(400).send("fake data")
        return 
    }
    
    const urlParams = new URLSearchParams(initData);
    const userJson = urlParams.get('user');
    if (userJson) {
        const user = JSON.parse(userJson);
        const telegram_id = user.id
        await validate_service.createInitData(telegram_id, initData)
        res.status(200).send("create initData")
    }
})


export default routerValidate