import express from "express";
import { createInvent, ReadInventoryByIngName, ReadSalesByDaily } from "../KitchenControllers/Kitchen.controller";

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
 * /Inventory/{IngName}:
 *   get:
 *     summary: Get inventory by ingredient name
 *     tags: [Kitchen]
 *     description: |
 *       Retrieves the inventory record for a specific ingredient available in the kitchen.
 *       This helps restaurant managers check remaining stock levels before preparing dishes.
 *     parameters:
 *       - in: path
 *         name: IngName
 *         required: true
 *         schema:
 *           type: string
 *           example: Tomato
 *     responses:
 *       200:
 *         description: Ingredient inventory returned successfully
 *       404:
 *         description: Ingredient not found
 */

/**
 * Read Inventory by Ingredient Name
 *
 * Returns the available stock information of a specific ingredient
 * stored in the kitchen inventory. Used for monitoring ingredient
 * quantities before cooking or restocking.
 */
KitchenRouter.get("/Inventory/:IngName",ReadInventoryByIngName);

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