import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import { IngredientStocktype, resObjtype } from "../../interface/Interface";
import { successResponse } from "../../utils/responseObj";
import KitchenObj from "../KitchenServices/Kitchen.service";



const createInvent = async(req: Request<{}, {}, IngredientStocktype>, res: Response, next: NextFunction) => {
    try {
        const inventBody = req.body;
        const kitchenData= await KitchenObj.createKitchenInventory(inventBody);
        if(!kitchenData){
            throw new Error("failed to write kitchenData");
        }
        successResponse(res,
            200,
            "successfully inventory obj created",
            kitchenData);

    } catch (err) {
        next(err);
    }
}

export { createInvent };


