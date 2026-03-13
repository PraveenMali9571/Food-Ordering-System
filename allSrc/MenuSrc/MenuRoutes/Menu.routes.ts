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
 * Create Menu Route
 *
 * Endpoint used by the restaurant administrator to create a menu
 * for a specific meal type such as breakfast, lunch, or dinner.
 *
 * The menu contains:
 * - Meal name (breakfast | lunch | dinner)
 * - Menu start time
 * - Menu end time
 * - List of dishes available during that meal
 *
 * Each dish in the list contains:
 * - ItemName (dish name)
 * - Description (information about the dish)
 * - DishRate (price of the dish)
 *
 * Use Case:
 * This route is used during system setup or menu updates when the
 * restaurant manager configures what dishes are available at a
 * particular time of the day.
 *
 * User Journey Context:
 * This is the **first step in the backend flow** because the menu
 * must exist before users can view or order dishes.
 *
 * Route:
 * POST /MenuCreate{/DishCreate}
 */
MenuRouter.post("/MenuCreate{/DishCreate}", MenuCreate);


/**
 * Create Dish Ingredient Mapping
 *
 * This route creates the ingredient list required to prepare a dish.
 * It defines which ingredients are used for cooking a particular dish.
 *
 * Each dish contains:
 * - ItemName (dish name)
 * - Ingredient array
 *
 * Each ingredient includes:
 * - Ing (ingredient name)
 * - QuantUse (quantity used for cooking the dish)
 * - Price (cost of the ingredient)
 *
 * Use Case:
 * This is mainly used by the kitchen management system to track
 * ingredient usage when a dish is prepared.
 *
 * User Journey Context:
 * When a user orders a dish later, the system automatically:
 * 1. Reads this ingredient list
 * 2. Deducts ingredient quantities from inventory
 * 3. Updates stock levels
 *
 * Route:
 * POST /MenuIngredient
 */
MenuRouter.post("/MenuIngredient", DishIngCreate);


/**
 * Read Menu By Meal
 *
 * This endpoint returns the menu based on the requested meal type.
 * Example meal values:
 * - breakfast
 * - lunch
 * - dinner
 *
 * Use Case:
 * Used by the restaurant manager or frontend system to retrieve
 * available dishes for a specific meal time.
 *
 * Although primarily designed for management and system integration,
 * the frontend can also use this route to display menus dynamically
 * depending on the time of day.
 *
 * Example:
 * GET /Menu/lunch
 *
 * Response:
 * Returns the list of dishes available for the requested meal.
 *
 * Route:
 * GET /Menu/:Meal
 */
MenuRouter.get("/Menu/:Meal", MenuRead);


/**
 * Dish Order Processing Route
 *
 * This endpoint simulates the ordering of a dish.
 *
 * When a user selects a dish from the menu, this API triggers
 * the complete backend flow required to process that order.
 *
 * Behind the scenes the system performs multiple operations:
 *
 * 1. Reads the dish ingredient list
 * 2. Deducts ingredient quantities from inventory
 * 3. Updates kitchen stock levels
 * 4. Updates daily sales records
 * 5. Tracks dish preparation workflow
 *
 * The goal is to keep the entire ordering pipeline fast so that
 * all dependent systems (inventory, sales, kitchen operations)
 * are updated immediately after a dish is ordered.
 *
 * User Journey Context:
 * This route represents the **core action performed by a user**
 * when they place an order in the restaurant system.
 *
 * Example:
 * GET /Menu/DishOrder/Palak Paneer
 *
 * Route:
 * GET /Menu/DishOrder/:Dish
 */
MenuRouter.get("/Menu/DishOrder/:Dish", DishRead);


/**
 * Delete Menu or Dish From Menu
 *
 * This endpoint supports two deletion scenarios:
 *
 * 1. Delete an entire meal menu
 *    Example:
 *    DELETE /Menu/lunch
 *
 * 2. Delete a specific dish from a meal menu
 *    Example:
 *    DELETE /Menu/lunch/Palak Paneer
 *
 * Use Case:
 * Used by the restaurant administrator to manage menus and remove
 * dishes that are no longer available.
 *
 * Route:
 * DELETE /Menu/:Meal{/:Dish}
 */
MenuRouter.delete("/Menu/:Meal{/:Dish}", DeleteMenuWithDish);


/**
 * Delete Dish Ingredient Information
 *
 * This route deletes ingredient information associated with a dish.
 *
 * It supports:
 * - Deleting the entire ingredient list of a dish
 * - Deleting a specific ingredient from the ingredient list
 *
 * Example:
 * DELETE /Menu/PalakPaneer
 * DELETE /Menu/PalakPaneer/Paneer
 *
 * Use Case:
 * Used when modifying recipes or removing ingredients
 * from a dish configuration in the kitchen system.
 *
 * Route:
 * DELETE /Menu/:DishIng{/:IngName}
 */
MenuRouter.delete("/Menu/:DishIng{/:IngName}", DeleteDishWithIng);


export default MenuRouter;