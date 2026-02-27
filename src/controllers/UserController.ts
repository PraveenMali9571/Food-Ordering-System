import type{Request , Response } from "express";
import UserObj from "../services/UserServices";
// import User from '../models/User.ts';
import { Usertype } from "../interface/Interface";


const UserCreate= (req:Request<{},{},Usertype>,res:Response)=>{
        try{

                const createData= UserObj.Create(req.body);
                // console.log(body);

                // console.log("req.body",body['IsoStamp'].getMonth(),body['IsoStamp'].getDay());
                if(!createData)
                {
                    
                    throw new Error(`something wrong in the class side`);

                }

                res.status(200).json({message:"data send successfully"});
            }

        catch(err)
        {
            res.status(400).json({message:`something wrong in the user side${err} `});
        }
}

export  {UserCreate};