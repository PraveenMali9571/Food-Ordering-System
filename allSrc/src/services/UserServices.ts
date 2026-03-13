import UserSchema from "../models/User";
import { getMealTypeByTime} from "../../ConversionFunc/Function";
import { Usertype } from "../../interface/Interface";
import { InternalServerError } from "../../utils/errorClasses";

class User {
  async Create(body: Usertype) {
    try {
        const Time= body.Time.toString();

      const userInsert = await UserSchema.create(body);

      const TmMeal= await getMealTypeByTime(Time); 

      if(!userInsert){
        throw new InternalServerError("failed to fetch userInsert");
      }

      return TmMeal;

    } catch (err: any) {

      throw new InternalServerError("Create Error");
    }
  }
}

const UserObj = new User();
export default UserObj;