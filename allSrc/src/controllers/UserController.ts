import type{NextFunction, Request , Response } from "express";
import UserObj from "../services/UserServices";
import { Usertype } from "../../interface/Interface";
import { InternalServerError } from "../../utils/errorClasses";
import { successResponse } from "../../utils/responseObj";

const UserCreate= async(req:Request<{},{},Usertype>,res:Response,next:NextFunction)=>{
        try{
            const dt= new Date();
            const body = Object.assign(req.body,{Time:dt}) ;

            const createData= await UserObj.Create(body);

            if(!createData)
            {
                throw new InternalServerError(`something wrong in the class side`);
            }
            successResponse(res,200,"creation of user successfully",createData);
        }

        catch(err)
        {
            next(err)
        }
}

export  {UserCreate};