import express from "express";
import { createInvent, ReadSalesByDaily } from "../KitchenControllers/Kitchen.controller";


const KitchenRouter = express.Router();

KitchenRouter.post("/KitchenInventory",createInvent);
KitchenRouter.get("/SalesDaily/:SaleDate",ReadSalesByDaily);

export default KitchenRouter;