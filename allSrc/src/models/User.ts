import mongoose from "mongoose";
const {Schema,model}= mongoose;
import {Usertype} from "../../interface/Interface";

            // Schema for the User to store an information in DB

const UserSchema = new Schema<Usertype>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    Time:{
        type:Date,
    }
    
},{
    timestamps:true,
})

const User = model<Usertype>('User', UserSchema);
export default User;