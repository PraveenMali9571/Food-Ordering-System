
import UserSchema from "../models/User";
import {Request,Response} from "express"
import { Usertype } from "../interface/Interface";

class User {
  async Create(body:any) {
    try {
      const userInsert = await UserSchema.create(body);
      console.log(userInsert);
      return console.log("successfully user created");
      
    } catch (err:any) {
      console.error("Create Error:", err);
    }
  }
}

const UserObj = new User();
export default UserObj;