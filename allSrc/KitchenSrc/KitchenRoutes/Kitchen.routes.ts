import express from "express";
import { createInvent } from "../KitchenControllers/Kitchen.controller";


const KitchenRouter = express.Router();

KitchenRouter.post("/KitchenInventory",createInvent);
// KitchenRouter.get("/")

export default KitchenRouter;