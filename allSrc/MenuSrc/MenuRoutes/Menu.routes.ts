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
 * tags:
 *   name: Menu
 *   description: Menu and dish management APIs
 */

/**
 * @swagger
 * /MenuCreate:
 *   post:
 *     summary: Create meal menu
 *     tags: [Menu]
 *     description: Create a menu for breakfast, lunch, or dinner with dish list.
 *     requestBody:
 *       required: true
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
 * /MenuIngredient:
 *   post:
 *     summary: Create dish ingredient mapping
 *     tags: [Menu]
 *     description: Adds ingredient list required to cook a dish.
 *     requestBody:
 *       required: true
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