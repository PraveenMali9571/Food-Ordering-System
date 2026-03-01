
import UserSchema from "../models/User";
import MenuObj from "../../MenuSrc/MenuServices/Menu.service";
// import {Request,Response} from "express"
import { TimetoMeal } from "../../ConversionFunc/Function";
import { Usertype } from "../../interface/Interface";

class User {
      // this.timestamps:any;
  //     Time:any;
  // constructor(Time:any){
  //     this.Time=Time;
  // }
  async Create(body: Usertype) {
    try {
        const Time= body.Time.toString();

      const userInsert = await UserSchema.create(body);

      const TmMeal= await TimetoMeal(Time); 
      // if(!userInsert){
      //   throw new Error("wrong in create user side ");
      // }

      return TmMeal;

    } catch (err: any) {
      console.error("Create Error:", err);
    }
  }
}

const UserObj = new User();
export default UserObj;