import type{NextFunction, Request , Response } from "express";
import UserObj from "../services/UserServices";
// import User from '../models/User.ts';
import { Usertype } from "../../interface/Interface";


const UserCreate= async(req:Request<{},{},Usertype>,res:Response,next:NextFunction)=>{
        try{
            const dt= new Date();
               const body = Object.assign(req.body,{Time:dt}) ;

                const createData= await UserObj.Create(body);

                // console.log("req.body",body['IsoStamp'].getMonth(),body['IsoStamp'].getDay());
                if(!createData)
                {
                    
                    throw new Error(`something wrong in the class side`);

                }
                console.log(createData,"createdaa object from response");

                res.status(200).json(createData);
            }

        catch(err)
        {
            next(err)
        }
}

export  {UserCreate};