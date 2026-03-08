import express from "express";
import type { NextFunction, Request, Response } from "express"
import { Menutype,DishIngListType } from "../../interface/Interface";
import MenuObj from "../MenuServices/Menu.service";


// <======================== MENU FUNCTION ====================>

const MenuCreate = async (req: Request<{}, {}, Menutype>, res: Response,next:NextFunction) => {
    try {
        const body = req.body;
        const MenuData = await MenuObj.createMenu(body);
        // console.log(MenuData, "menu data");

        if (!MenuData) {
            throw new Error("something wrong in the menulist side");
        }

        // console.log("in controlller response above");
        res.status(200).json({ message: "Menu added successfully" });

    }
    catch (err) {
       
       next(err); // res.status(400).json(err);
    }
}

// <======================== DISH INGRIDEINT LIST FUNCTION ====================>

const DishIngCreate = async (req: Request<{}, {},DishIngListType>, res: Response,next:NextFunction) => {
    try {
        const Ingbody = req.body;
        const Dishdata = await MenuObj.createDish(Ingbody);

        if (!Dishdata) {
            throw new Error(`Dish Data not failed to fetch`);
        }
        res.status(200).json(Dishdata);
        
    } 
    catch (err) {
       
       next(err); // res.status(400).json(err);
    }
}


// <======================== MENU READ FUNCTION ====================>

const MenuRead= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const { Meal} = req.params;

        const readData= await MenuObj.readMenu(Meal);
        if(!readData){
            throw new Error(`readData not Found or failed to fetch`);
        }
        res.status(200).json(readData);
    }
    catch(err){
       
       next(err); // res.status(400).json(`error in menu read ${err}`);
    }
}


// <======================== MENU READ FUNCTION ====================>

const  DishRead = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {Dish}=req.params;
        res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Encoding", "identity");
    res.setHeader("Transfer-Encoding", "chunked");
    // res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

            const onWaiting = function (subResData:any){
                console.log("working of the waiting function");
            res.write(JSON.stringify(subResData)); // this send the sub-response from service
        }
        
        const DishreadData = await MenuObj.readDish(Dish,onWaiting);

        if(!DishreadData){

            throw new Error(`DishreadData failed to fetch`);
        }
        res.end(JSON.stringify(DishreadData));
        
    }catch(err){
       
       next(err); 
    }

}

export { MenuCreate, DishIngCreate,MenuRead,DishRead};