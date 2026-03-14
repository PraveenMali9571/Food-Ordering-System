import express from "express";
import {
  MenuCreate,
  DishIngCreate,
  MenuRead,
  DishRead,
  DeleteDishWithIng,
  DeleteMenuWithDish
} from "../MenuControllers/Menu.controller";

const MenuRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       required:
 *         - ItemName
 *         - Description
 *         - DishRate
 *       properties:
 *         ItemName:
 *           type: string
 *           example: Palak Paneer
 *         Description:
 *           type: string
 *           example: Spinach gravy cooked with soft paneer cubes
 *         DishRate:
 *           type: number
 *           example: 170
 *
 *     MenuCreateSimple:add only the dishes in the Menu like breakfast etc
 *       type: object
 *       required:
 *         - Meal
 *         - List
 *       properties:
 *         Meal:
 *           type: string
 *           example: lunch
 *         List:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Dish'
 *
 *     MenuCreateWithTime: add whole Menu with the dishes also etc
 *       type: object
 *       required:
 *         - StartTime
 *         - EndTime
 *         - Meal
 *         - List
 *       properties:
 *         StartTime:
 *           type: string
 *           format: date-time
 *           example: "2026-02-28T11:31:00.000Z"
 *         EndTime:
 *           type: string
 *           format: date-time
 *           example: "2026-02-28T18:30:00.000Z"
 *         Meal:
 *           type: string
 *           example: lunch
 *         List:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Dish'
 */
/**
 * @swagger
 * /MenuCreate:
 *   post:
 *     summary: Create meal menu
 *     description: Create a menu for breakfast, lunch, or dinner with dish list
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/MenuCreateSimple'
 *               - $ref: '#/components/schemas/MenuCreateWithTime'
 *     responses:
 *       200:
 *         description: Menu created successfully
 */
/**
 * Create Menu
 * Creates a meal menu containing dish list and pricing.
 * Used by restaurant admin during menu setup.
 */
MenuRouter.post("/MenuCreate", MenuCreate);


/**
 * @swagger
 * components:
 *   schemas:
 *     IngredientItem:
 *       type: object
 *       required:
 *         - Ing
 *         - Price
 *         - QuantUse
 *       properties:
 *         Ing:
 *           type: string
 *           example: Spices
 *         Price:
 *           type: number
 *           example: 15
 *         QuantUse:
 *           type: number
 *           example: 20
 *
 *     DishIngredientAdd:
 *       type: object
 *       required:
 *         - ItemName
 *         - Ingredient
 *       properties:
 *         ItemName:
 *           type: string
 *           example: Rajma Chawal
 *         Ingredient:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IngredientItem'
 *
 *     DishIngredientFull:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 69a447823590cd294204064d
 *         ItemName:
 *           type: string
 *           example: Rajma Chawal
 *         Ingredient:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               Ing:
 *                 type: string
 *                 example: Rajma
 *               Price:
 *                 type: number
 *                 example: 40
 *               QuantUse:
 *                 type: number
 *                 example: 200
 *               _id:
 *                 type: string
 *                 example: 69a447823590cd294204064e
 *         __v:
 *           type: number
 *           example: 0
 */

/**
 * @swagger
 * /MenuIngredient:
 *   post:
 *     summary: Create dish ingredient mapping
 *     tags:
 *       - Menu
 *     description: Adds ingredient list required to cook a dish or creates dish with ingredient details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/DishIngredientAdd'
 *               - $ref: '#/components/schemas/DishIngredientFull'
 *     responses:
 *       200:
 *         description: Dish ingredient added successfully
 */

/**
 * Create Dish Ingredients
 * Stores ingredient list used to prepare a dish.
 * Used later for inventory deduction during orders.
 */
MenuRouter.post("/MenuIngredient", DishIngCreate);


/**
 * @swagger
 * /Menu/{Meal}:
 *   get:
 *     summary: Get menu by meal type
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: Meal
 *         required: true
 *         schema:
 *           type: string
 *           example: lunch
 *     responses:
 *       200:
 *         description: Returns menu for requested meal
 */

/**
 * Read Menu
 * Returns dishes available for a specific meal time
 * such as breakfast, lunch, or dinner.
 */
MenuRouter.get("/Menu/:Meal", MenuRead);


/**
 * @swagger
 * /Menu/DishOrder/{Dish}:
 *   get:
 *     summary: Order a dish
 *     tags: [Menu]
 *     description: Starts kitchen process, updates sales and inventory.
 *     parameters:
 *       - in: path
 *         name: Dish
 *         required: true
 *         schema:
 *           type: string
 *           example: Palak Paneer
 *     responses:
 *       200:
 *         description: Dish order processed
 */

/**
 * Dish Order
 * Simulates ordering a dish and triggers backend flow:
 * kitchen process → inventory deduction → sales update.
 */
MenuRouter.get("/Menu/DishOrder/:Dish", DishRead);


/**
 * @swagger
 * /Menu/{Meal}:
 *   delete:
 *     summary: Delete meal menu
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: Meal
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu deleted
 */

/**
 * Delete Menu
 * Removes a full meal menu or a specific dish
 * from the menu list.
 */
MenuRouter.delete("/Menu/:Meal{/:Dish}", DeleteMenuWithDish);


/**
 * @swagger
 * /Menu/{DishIng}:
 *   delete:
 *     summary: Delete dish ingredient mapping
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: DishIng
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient mapping removed
 */

/**
 * Delete Dish Ingredients
 * Removes ingredient mapping of a dish or
 * deletes a specific ingredient from the list.
 */
MenuRouter.delete("/Menu/:DishIng{/:IngName}", DeleteDishWithIng);

export default MenuRouter;