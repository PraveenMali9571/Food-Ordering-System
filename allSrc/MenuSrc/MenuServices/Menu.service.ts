import { checkAddDishAddIng, KitchenProcess } from "../../ConversionFunc/KitchenFunction";
import { MenuModel, DishIngModel } from "../MenuModels/Menu.model";
import { InternalServerError, NotFoundError } from "../../utils/errorClasses";
import { checkMealMenu } from "../../ConversionFunc/Function";

class Menu {

    async createMenu(body: any) {
        try {

            const checkforMenu = await checkMealMenu(body);

            if (!checkforMenu) {

                console.log(checkforMenu, "in the checkforMenu");
                throw new InternalServerError("something wrong in this side of checkforMenu function");

            }

            console.log("below checkforMenu");

            return checkforMenu;

        }
        catch (err) {
            throw new InternalServerError(`something wrong happened ${err}`);
        }

    }

    async createDish(Ingbody: any) {
        try {

            const IngData = await checkAddDishAddIng(Ingbody);

            if (!IngData) {
                throw new InternalServerError("error in  Dish ingrident");
            }

            return IngData;
        }
        catch (err: any) {
            throw new InternalServerError(`${err} error in createDish method`);
        }
    }

    async readMenu(Meal: any) {
        try {
            const reData = await MenuModel.findOne(
                {
                    Meal: Meal.toLowerCase()
                },
                {
                    // Meal:1,
                    List: 1
                }
            );

            if (!reData) {
                throw new NotFoundError("Menu Not Found");
            }

            return reData;
        }
        catch (err: any) {
            throw new InternalServerError(`error in the read side`);
        }
    }

    async readDish(Dish: any, onWaiting: Function) {
        try {
            const reDish = await DishIngModel.find(
                {
                    ItemName: Dish
                },
                {
                    ItemName: 1,
                    Ingredient: 1
                });

            console.log(reDish[0], "redish service redish");
            const cookdata = await KitchenProcess(reDish[0], onWaiting);

            if (cookdata) {
                console.log(cookdata, "cookdata");
                return cookdata;
            }

        }
        catch (err: any) {
            throw new InternalServerError(`Error in the readDish Side`);
        }
    }

    async deleteMealDish(Meal: any, Dish: any) {
        console.log("in the service");

        if (Dish === "Default") {
            console.log(Dish, "dish in if block");
            const findDeleteMenu = await MenuModel.findOneAndDelete({
                Meal: Meal
            });
            if (!findDeleteMenu) {
                return `No data available on behalf of this Meal in the Menu`;
            }
            return " Menu deleted successfully";

        } else {
            const findDeleteDishbyMenu = await MenuModel.findOneAndUpdate(
                {
                    Meal: Meal,
                    "List.ItemName": Dish
                },
                {
                    $pull: {
                        List: { ItemName: Dish }
                    }
                }
            );


            console.log(findDeleteDishbyMenu, "find dish delete");

            if (!findDeleteDishbyMenu) {

                return 'No data available of the Dish Name';
            }
            return `Dish Obj deleted successfully`;
        }

    }

    async deleteDishIng(Dish: any, IngName: any) {
        
        if (IngName === "Default") {
            const findDishIngforDelete = await DishIngModel.findOneAndDelete(
                {

                    ItemName: Dish
                }
            );
            if (!findDishIngforDelete) {
                return ` No Dishes available in the Dishes `;
            }
            return findDishIngforDelete;
        }
        else {
            const findDishIng = await DishIngModel.findOneAndUpdate(
                {
                    ItemName: Dish,
                    "Ingredient.Ing": IngName
                },
                {
                    $pull: {
                        Ingredient: {
                            Ing: IngName
                        }
                    }
                }
            )
            if (!findDishIng) {
                return `Ingredient is not listed in the Dish for making purpose`;
            }
            return findDishIng;
        }
    }
}

const MenuObj = new Menu();
export default MenuObj;