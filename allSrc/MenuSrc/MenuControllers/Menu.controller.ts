import express from "express";
import type { NextFunction, Request, Response } from "express"
import { Menutype,DishIngListType } from "../../interface/Interface";
import MenuObj from "../MenuServices/Menu.service";
import { InternalServerError, NotFoundError } from "../../utils/errorClasses";
import { successResponse } from "../../utils/responseObj";



// <======================== MENU FUNCTION ====================>

const MenuCreate = async (req: Request<{}, {}, Menutype>, res: Response,next:NextFunction) => {
    try {
        const body = req.body;
        const MenuData = await MenuObj.createMenu(body);

        if (!MenuData) {
            throw new InternalServerError("something wrong in the menulist side");
        }
        // successResponse(res,
        //     200,
        //     message:res.message,
        //     data:MenuData,

        // )
        res.status(200).json(MenuData);

    }
    catch (err) {
       next(err);
    }
}


// <======================== DISH INGRIDEINT LIST FUNCTION ====================>

const DishIngCreate = async (req: Request<{}, {},DishIngListType>, res: Response,next:NextFunction) => {
    try {
        const Ingbody = req.body;
        const Dishdata = await MenuObj.createDish(Ingbody);

        if (!Dishdata) {
            throw new InternalServerError(`Dish Data not failed to fetch`);
        }

        res.status(200).json(Dishdata);
        
    } 
    catch (err) {
       next(err);
    }
}


// <======================== MENU READ FUNCTION ====================>

const MenuRead= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const { Meal} = req.params;

        const readData= await MenuObj.readMenu(Meal);

        if(!readData){
            throw new NotFoundError(`readData not Found or failed to fetch`);
        }

        res.status(200).json(readData);

    }
    catch(err){
       next(err);
    }
}


// <======================== DISH READ FUNCTION ====================>

const  DishRead = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {Dish}=req.params;

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Encoding", "identity");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Connection", "keep-alive");

        const onWaiting = function (subResData:any){

            console.log("working of the waiting function");
            res.write(JSON.stringify(subResData));
        }
        
        const DishreadData = await MenuObj.readDish(Dish,onWaiting);

        if(!DishreadData){
            throw new NotFoundError(`DishreadData failed to fetch`);
        }

        res.end(JSON.stringify(DishreadData));
        
    }catch(err){
       next(err); 
    }
}

export { MenuCreate, DishIngCreate,MenuRead,DishRead};