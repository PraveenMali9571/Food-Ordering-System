import { KitchenProcess } from "../../ConversionFunc/KitchenFunction";
import { MenuModel, DishIngModel } from "../MenuModels/Menu.model";
import { InternalServerError, NotFoundError } from "../../utils/errorClasses";
import { checkMealMenu } from "../../ConversionFunc/Function";

class Menu {

    async createMenu(body: any) {
        try {

            const checkforMenu = await checkMealMenu(body);

            if (!checkforMenu) {

                // console.log(checkforMenu,"in the checkforMenu");
                throw new InternalServerError("something wrong in this side of checkforMenu function");

            }

            // console.log("below checkforMenu");

            return checkforMenu;

        }
        catch (err) {
            throw new InternalServerError(`something wrong happened ${err}`);
        }

    }

    async createDish(Ingbody: any) {
        try {

            const IngData = await DishIngModel.create(Ingbody);

            if (!IngData) {
                throw new InternalServerError("error in  Dish ingrident");
            }

            return "successfully added Dish ingredent";
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

}

const MenuObj = new Menu();
export default MenuObj;