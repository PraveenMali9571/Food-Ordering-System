import express from "express";
import { createInvent, ReadSalesByDaily } from "../KitchenControllers/Kitchen.controller";

const KitchenRouter = express.Router();

/**
 * Create Kitchen Inventory
 *
 * This endpoint is used to create and maintain the ingredient stock
 * available in the restaurant kitchen.
 *
 * The inventory record contains:
 * - IngredientName : Name of the ingredient
 * - TotalQuantity  : Total quantity available in stock
 * - ItemNumber     : Internal identifier for the ingredient item
 *
 * Purpose:
 * This route initializes or adds ingredient stock so that the kitchen
 * system knows how much inventory is available for cooking dishes.
 *
 * Backend Flow:
 * When a user later orders a dish, the system:
 * 1. Reads the ingredient list required for that dish
 * 2. Deducts the quantity used from this inventory
 * 3. Updates the remaining stock automatically
 *
 * This ensures that the kitchen inventory always reflects the real
 * ingredient usage during dish preparation.
 *
 * Use Case:
 * Used by restaurant managers or kitchen administrators to register
 * or update available ingredients before service begins.
 *
 * Route:
 * POST /KitchenInventory
 */
KitchenRouter.post("/KitchenInventory", createInvent);


/**
 * Read Daily Sales Report
 *
 * This endpoint retrieves the sales data for a specific date.
 *
 * The sales object is automatically created and updated by the backend
 * whenever a user places an order in the system.
 *
 * The daily sales record contains:
 * - SaleDate
 * - DailyTotal (total revenue generated)
 * - TotalDishes (total dishes sold)
 * - AllDayOrder (sales breakdown by meal type)
 *
 * Backend Flow:
 * When a user orders a dish:
 * 1. The system checks if a sales record exists for the current date
 * 2. If not, it creates a new daily sales object
 * 3. The ordered dish updates:
 *    - daily revenue
 *    - number of dishes sold
 *    - meal specific sales
 *
 * Purpose:
 * This route allows restaurant managers to view daily sales performance
 * and track how many dishes were sold on a given date.
 *
 * Example:
 * GET /SalesDaily/2026-03-13
 *
 * Route:
 * GET /SalesDaily/:SaleDate
 */
KitchenRouter.get("/SalesDaily/:SaleDate", ReadSalesByDaily);


export default KitchenRouter;