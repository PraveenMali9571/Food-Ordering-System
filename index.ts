import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./src/config/db";
import UserRouter from "./src/routes/UserRoutes";
// import UserRouter from 'path.join(path.resolve(),"/routes/UserRoutes.ts")';

const app = express();
const Port =process.env.PORT || 5000;

// console.log("in the app")
app.use(express.json());
app.use(UserRouter);
// console.log("above port")

connectDb();
app.listen(Port, () => {
    console.log(`Server listening on ${Port}`);
})
