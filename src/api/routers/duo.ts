import { Router } from "express";
import { Request, Response } from "express";
import DuoService from "../services/model_service/duo_service";
import UserService from "../services/model_service/user_service";

import { CriticalDamageBody } from "../types/types_body/critical_damage_body";
import { NewDuoBody } from "../types/types_body/new_duo_body";
import { DamageDuoBody } from "../types/types_body/damage_duo_body";
import { SetStageBody } from "../types/types_body/set_stage_body";
import { RecoveryDuoBody } from "../types/types_body/recovery_duo_body";
import db from "../../database/db";


const routerDuo = Router();


routerDuo.post("/new_duo", async (req: Request, res: Response ) =>{
    const data: NewDuoBody = req.body;
    const duo_service = new DuoService(db);

    if (!data) {
        res.send("not body").status(500);
        return;
    };

    const duo = await duo_service.getDuo(data.owner_id);

    if (duo) {
        res.send("already duo").status(400);
        return;
    };

    await duo_service.insertDuo(data.owner_id);
    res.send("register duo").status(201);
});




routerDuo.post("/damage_duo", async (req: Request, res: Response) => {
    const data: DamageDuoBody = req.body;
    const duo_service = new DuoService(db);
    const user_service = new UserService(db);
    const user = await user_service.getUser(data.owner_id);
    const duo = await duo_service.getDuo(data.owner_id);
    
    if (!user){
        res.status(500).send("Not user data");
        return
    }

    if (!duo) {
        res.status(500).send("Not duo data");
        return
    }

    let damage = 40 * user.damage;
    let feathers = 40 * user.damage;

    if (duo?.health - 40 < 0) {
        damage = duo.health;
    } 

    if (duo.stage == 6){
        feathers *= 2;
    }
    
    await duo_service.damageDuo(data.owner_id, damage);
    await user_service.addFeathers(data.owner_id, feathers);
    res.status(200).send("successfully demage do duo");
})

routerDuo.post("/set_stage", async (req: Request, res: Response) => {
    const data: SetStageBody = req.body;
    const duo_service = new DuoService(db);

    await duo_service.setStageDuo(data.owner_id, data.new_stage);
    res.status(200).send("successfully set stage duo");
})

routerDuo.post("/critical_damage", async (req: Request, res: Response) => {
    const data: CriticalDamageBody = req.body;
    const duo_service = new DuoService(db);

    await duo_service.criticalDamageDuo(data.owner_id);
    res.status(200).send("successfully critical damage duo");
    
})

routerDuo.get("/get_all_duo", async (req: Request, res: Response) => {
    const duo_service = new DuoService(db);
    const duos = await duo_service.getAllDuo();

    if (!duos) {
        res.status(404).send("Not found data all duo")
        return
    }

    res.status(200).json({duos: duos})
})


routerDuo.post("/recovery_duo", async (req: Request, res: Response) => {
    const data: RecoveryDuoBody = req.body;
    const duo_service = new DuoService(db);
    const duo = await duo_service.getDuo(data.owner_id)

    if (!duo){
        res.status(404).send("Not found data duo")
        return
    }
    const new_health = 850 + 350 * (duo.level + 1)
    await duo_service.recoveryDuo(duo.owner_id, new_health)
    res.status(200).send("Duo successfully recovery")


})


routerDuo.get("/:owner_id", async (req: Request, res: Response) => {
    const owner_id = parseInt(req.params.owner_id);
    const duo_service = new DuoService(db);
    const duo = await duo_service.getDuo(owner_id);

    if (!duo) {
        res.status(404).send("not found duo");
        return;
        
    }

    res.status(200).json({duo: duo});
})

export default routerDuo