import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await  mongoose.connect("mongodb+srv://praveenMalidbUserAdmin:praveenMalidbUserPass@cluster0.izsxx2q.mongodb.net/");
        console.log("mongodb Connect Successfully");
    } catch (err) {
        console.log("Db-Error -:",err);
        process.exit(1);
    }
}

export default connectDb;
