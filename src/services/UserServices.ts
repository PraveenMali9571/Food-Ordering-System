// src/services/UserService.ts

import UserSchema from "../models/User.js";

// ✅ Define type
type Usertype = {
  uid: string;
  name: string;
};

class User {
  async Create(body: Usertype) {
    try {
      const userInsert = await UserSchema.create({
        uid: body.uid,
        name: body.name,
      });

      return userInsert;
    } catch (err: any) {
      console.error("Create Error:", err);

      if (err.code === 11000) {
        throw new Error("User already exists");
      }

      throw err;
    }
  }
}

const UserObj = new User();
export default UserObj;