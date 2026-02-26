import express from "express";
import connectDb from "./src/config/db.ts";
import UserRouter from "./src/routes/UserRoutes.ts";
// import UserRouter from 'path.join(path.resolve(),"/routes/UserRoutes.ts")';

const app = express();
const Port: number = 5000;

// console.log("in the app")
app.use(express.json());
app.use(UserRouter);
// console.log("above port")

connectDb();
app.listen(Port, () => {
    console.log(`Server listening on ${Port}`);
})
