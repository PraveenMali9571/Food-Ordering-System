import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db";
import UserRouter from "./src/routes/UserRoutes";
import MenuRouter from "./MenuSrc/MenuRoutes/Menu.routes";
import KitchenRouter from "./KitchenSrc/KitchenRoutes/Kitchen.routes";
import { Errormiddleware } from "./middleware/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { Connection } from "mongoose";


const app = express();
const Port =process.env.PORT || 5000;

app.use(express.json());


// <=================== All the Router================>
app.use(UserRouter);
app.use(MenuRouter);
app.use(KitchenRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Errormiddleware);

// <====================Database Connection================>
 connectDb();

app.listen(Port, () => {
    console.log(`Server listening on ${Port}`);
})
