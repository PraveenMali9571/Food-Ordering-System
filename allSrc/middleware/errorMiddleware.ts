import type{Request,Response,NextFunction } from "express";
import { HttpError } from "../utils/errorClasses";
import { errorResponse } from "../utils/responseObj";

export const Errormiddleware= (err:Error,req:Request,res:Response,next:NextFunction)=>{
  const error = err as HttpError;
  if(error instanceof HttpError){
      return errorResponse(res,
        error.statusCode ,
        error.name,
        error.message,
        error.stack ||"",
      )
  }
  else{
     return errorResponse(res,
        500,
        'Internal Server Error',
        'something went on server side',
        undefined
      )
  }
        
}