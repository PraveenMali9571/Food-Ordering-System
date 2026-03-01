import express from "express";
import type { Request, Response } from "express"
import { Menutype,DishIngListType } from "../../interface/Interface";
import MenuObj from "../MenuServices/Menu.service";


// <======================== MENU FUNCTION ====================>

const MenuCreate = async (req: Request<{}, {}, Menutype>, res: Response) => {
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
    catch (err: any) {
        res.status(400).json(err);
    }
}

// <======================== DISH INGRIDEINT LIST FUNCTION ====================>

const DishIngCreate = async (req: Request<{}, {},DishIngListType>, res: Response) => {
    try {
        const Ingbody = req.body;
        const Dishdata = await MenuObj.createDish(Ingbody);

        if (!Dishdata) {
            throw new Error(`error in DishINg ${Dishdata}`);
        }
        res.status(200).json(Dishdata);
        
    } 
    catch (err: any) {
        res.status(400).json(err);
    }
}


// <======================== MENU READ FUNCTION ====================>

const MenuRead= async(req:Request,res:Response)=>{
    try{
        const { Meal} = req.params;
        console.log(req.params);
        const readData= await MenuObj.readMenu(Meal);
        if(!readData){
            throw new Error(`error in readData${readData}`);
        }
        res.status(200).json(readData);
    }
    catch(err:any){
        res.status(400).json(`error in menu read ${err}`);
    }
}


// <======================== MENU READ FUNCTION ====================>

const  DishRead = async(req:Request,res:Response)=>{
    try{
        const {Dish}=req.params;
        const DishreadData = await MenuObj.readDish(Dish);

        if(!DishreadData){
            throw new Error(`wrong in DishreadData ${DishreadData}`);
        }

        res.status(200).json(DishreadData);
    }catch(err:any){
        res.status(400).json(`Error in the DishRead method${err}`);
    }

}

export { MenuCreate, DishIngCreate,MenuRead,DishRead};