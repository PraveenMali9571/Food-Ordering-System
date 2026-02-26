import type{Request , Response } from "express";
import UserObj from "../services/UserServices.ts";
// import User from '../models/User.ts';
type Usertype= {
    uid:number,
    name:string,
    IsoStamp:Date,
    address:string
}

const UserCreate= (req:Request<{},{},Usertype>,res:Response)=>{
        try{

            const body = Object.assign(req.body,{IsoStamp:new Date()});

                const createData= UserObj.Create(body as Usertype);
                console.log(body);

                // console.log("req.body",body['IsoStamp'].getMonth(),body['IsoStamp'].getDay());
                if(!createData)
                {
                    
                    throw new Error(`something wrong in the class side`);

                }

                res.status(200).json(createData);
            }

        catch(err)
        {
            res.status(400).json({message:`something wrong in the user side${err} `});
        }
}

export  {UserCreate};