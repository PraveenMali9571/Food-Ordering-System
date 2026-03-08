import UserSchema from "../models/User";
import MenuObj from "../../MenuSrc/MenuServices/Menu.service";
import { getMealTypeByTime} from "../../ConversionFunc/Function";
import { Usertype } from "../../interface/Interface";

class User {
  async Create(body: Usertype) {
    try {
        const Time= body.Time.toString();

      const userInsert = await UserSchema.create(body);

      const TmMeal= await getMealTypeByTime(Time); 
      if(!userInsert){
        throw new Error("failed to fetch userInsert");
      }

      return TmMeal;

    } catch (err: any) {
      console.error("Create Error:", err);
    }
  }
}

const UserObj = new User();
export default UserObj;