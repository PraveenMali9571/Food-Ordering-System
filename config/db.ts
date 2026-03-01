import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ADMIN_USER = process.env.ADMIN_USER as String;
const PASSWORD = process.env.PASSWORD as String;
const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${ADMIN_USER}:${PASSWORD}@cluster0.izsxx2q.mongodb.net/Food_Ordering_Db`);
        console.log("mongodb Connect Successfully");
    } catch (err) {
        console.log("Db_Error -:", err);
        process.exit(1);
    }
}

export default connectDb;
