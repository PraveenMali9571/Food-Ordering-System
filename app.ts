import express from "express";
import UserRouter from "./src/routes/User-routes.ts";
const app= express();
const Port:number = 5000;
// console.log("in the app")
app.use(express.json());
app.use(UserRouter);

// console.log("above port")
app.listen(Port,()=>{
    console.log(`Server listening on ${Port}`);
})



