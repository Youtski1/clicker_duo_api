import { Router } from "express";
import { Request, Response } from "express";

import UserService from "../services/model_service/user_service";
import { NewUserBody } from "../types/types_body/new_user_body";
import { UpgradeDamageBody } from "../types/types_body/upgrade_damage_body";
import db from "../../database/db";

const routerUser = Router();



routerUser.post("/upsert_user", async (req: Request, res: Response) => {
    const user_service = new UserService(db);
    const data: NewUserBody = req.body;

    if (!data){
        res.status(400).send("not body request");
        return
    }
    
    await user_service.upsertUser(data.telegram_id, data.full_name, data.username);
    res.status(201).send("update user data");
})

routerUser.post("/upgrade_damage", async (req: Request, res: Response) => {
    const user_service = new UserService(db);
    const data: UpgradeDamageBody = req.body;
    
    if (!data) {
        res.status(400).send("not body reqest")
    }

    await user_service.upgradeDamage(data.telegram_id, data.feathers_count)
    res.status(200).send("successfully upgrade damage")
})


routerUser.get("/get_top_users", async (req: Request, res: Response) => {
    const user_service = new UserService(db);
    const top_users = await user_service.getTopUsersByLevel();

    console.log("TOP: " + top_users)

    if (!top_users) {
        res.status(404).send("not found users")
        return
    }

    res.status(200).json({top_users: top_users})
})

routerUser.get("/:telegram_id",async (req: Request, res: Response) => {
    const database_service = new UserService(db);
    const telegram_id = req.params.telegram_id as string;
    const user = await database_service.getUser(parseInt(telegram_id, 10));

    if (!user){
        res.status(404).send("Not found user")
        return
    }
    
    res.status(200).json({user: user})
})


export default routerUser

