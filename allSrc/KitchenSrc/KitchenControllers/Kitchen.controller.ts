import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import { IngredientStocktype, resObjtype } from "../../interface/Interface";
import { successResponse } from "../../utils/responseObj";
import KitchenObj from "../KitchenServices/Kitchen.service";
import { InternalServerError, NotFoundError } from "../../utils/errorClasses";


const createInvent = async (req: Request<{}, {}, IngredientStocktype>, res: Response, next: NextFunction) => {
    try {
        const inventBody = req.body;
        const kitchenData = await KitchenObj.createKitchenInventory(inventBody);

        if (!kitchenData) {
            throw new InternalServerError("failed to write kitchenData");
        }

        successResponse(res,
            200,
            "successfully inventory obj created",
            kitchenData);

    } catch (err) {
        next(err);
    }
}

const ReadInventoryByIngName= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const IngName:string|any= req.params.IngName;
        const ReadInventData:string= await KitchenObj.readbyIngName(IngName);
        if(!ReadInventData){
            throw new NotFoundError(`failed to fetch data of the ingredient name `);
        }
        successResponse(res,
            200,
            "fetched data successfully",
            ReadInventData
        );

    }catch(err){
        next(err);
    }
}
const ReadSalesByDaily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const SaleDate: string | Date = req.params.SaleDate as string;
        const readSaleData = await KitchenObj.readSalebyDate(SaleDate);
        if (!readSaleData) {
            throw new NotFoundError(`failed to fetched the data from database`);
        }
        successResponse(res,
            200,
            "successfully fetched the data",
            readSaleData
        )
    } catch (err) {
        next(err);
    }
}

export { createInvent, ReadSalesByDaily,ReadInventoryByIngName};