import express from "express";
import { createInvent, ReadSalesByDaily } from "../KitchenControllers/Kitchen.controller";

const KitchenRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Kitchen
 *   description: Kitchen inventory and sales management APIs
 */

/**
 * @swagger
 * /KitchenInventory:
 *   post:
 *     summary: Create kitchen inventory
 *     tags: [Kitchen]
 *     description: Adds ingredient stock available in the kitchen.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IngredientName:
 *                 type: string
 *                 example: Tomato
 *               ItemNumber:
 *                 type: number
 *                 example: 1
 *               TotalQuantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Inventory created successfully
 */

/**
 * Create Kitchen Inventory
 * Registers ingredient stock used for cooking dishes.
 * Inventory is later deducted automatically when dishes are prepared.
 */
KitchenRouter.post("/KitchenInventory", createInvent);


/**
 * @swagger
 * /SalesDaily/{SaleDate}:
 *   get:
 *     summary: Get daily sales report
 *     tags: [Kitchen]
 *     description: Returns sales data including revenue and dishes sold for a specific date.
 *     parameters:
 *       - in: path
 *         name: SaleDate
 *         required: true
 *         schema:
 *           type: string
 *           example: 2026-03-13
 *     responses:
 *       200:
 *         description: Daily sales record returned
 */

/**
 * Read Daily Sales
 * Retrieves daily sales data including total revenue
 * and number of dishes sold for a given date.
 */
KitchenRouter.get("/SalesDaily/:SaleDate", ReadSalesByDaily);

export default KitchenRouter;