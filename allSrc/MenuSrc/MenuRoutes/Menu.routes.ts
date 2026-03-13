import express from "express";
import {MenuCreate,DishIngCreate,MenuRead ,DishRead, DeleteDishWithIng,DeleteMenuWithDish} from "../MenuControllers/Menu.controller";

const MenuRouter = express.Router();

console.log("in the route ");
// All MenuRouter

MenuRouter.post("/MenuCreate{/DishCreate}",MenuCreate);
MenuRouter.post("/MenuIngredient",DishIngCreate);

MenuRouter.get("/Menu/:Meal",MenuRead);
MenuRouter.get("/Menu/DishOrder/:Dish",DishRead);

// MenuRouter.patch()
MenuRouter.delete("/Menu/:Meal{/:Dish}",DeleteMenuWithDish);
MenuRouter.delete("/Menu/:DishIng{/:IngName}",DeleteDishWithIng);

export default MenuRouter;