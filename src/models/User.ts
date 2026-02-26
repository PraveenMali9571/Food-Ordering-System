import mongoose from "mongoose";
const {Schema,model}= mongoose;

const UserSchema = new Schema({
    uid:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    IsoStamp:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    
},{
    timestamps:true,
})

const User = model('User', UserSchema);
export default User;