
import { MenuModel } from "../MenuSrc/MenuModels/Menu.model";
import MenuObj from "../MenuSrc/MenuServices/Menu.service";

// <=========================== FUNCTION FOR GIVING AN MEAL AS A TIME ==================>
/**
 * Determines the current meal type based on the provided time.
 *
 * It calculates whether the time falls into breakfast, lunch, or dinner
 * and then fetches the corresponding menu from the database. If the
 * restaurant is closed, it returns a default opening message.
 */
export const getMealTypeByTime = async (Time: any) => {
    try {
        const Menumeal = paraMeal(Time);
        if (Menumeal === "default") {

            return `Restaurant is Opening soon`;
        } else {
            const menudt = await MenuObj.readMenu(Menumeal);

            if (!menudt) {
                throw new Error('No menu data found for the requested time');
            }
            return menudt;
        }
    }
    catch (err: any) {
        throw new Error('failed to fetched the Menu Data');
    }


}
/**
 * Converts a given timestamp into a meal category.
 *
 * It compares the current time with predefined time ranges and
 * returns the appropriate meal type (breakfast, lunch, dinner)
 * or "default" if the restaurant is outside service hours.
 */
export function paraMeal(Tm: any) {
    let now = new Date(Tm);
    let Hr = now.getHours();
    let Mn = now.getMinutes();

    const HourToMinutes = (Hour: any, Minute: any) => {
        return Hour * 60 + Minute;
    }
    let UserCametime = HourToMinutes(Hr, Mn);
    let breakfastStartTime: number = HourToMinutes(7, 30);
    let breakfastEndTime: number = HourToMinutes(11, 30);
    let lunchEndTime: number = HourToMinutes(18, 30);
    let dinnerEndTime: number = HourToMinutes(20, 30);

    if (breakfastStartTime <= UserCametime && UserCametime <= breakfastEndTime) {

        console.log("breakfast");
        return `breakfast`;

    }
    else if (breakfastEndTime < UserCametime && UserCametime <= lunchEndTime) {

        console.log(`lunch`);
        return `lunch`;

    }
    else if (lunchEndTime < UserCametime && UserCametime <= dinnerEndTime) {
        console.log("dinner");
        return `dinner`;
    }
    else {
        console.log("default");
        return `default`;
    }
}


// <====================FUNCTION TO CHECK WHETHER AN MENU AVAILABLE OR NOT========================>
/**
 * Checks whether a meal menu or dish already exists in the database.
 *
 * If the meal menu does not exist, it creates a new menu. If the meal
 * exists, it verifies whether the dish is already present and either
 * prevents duplication or adds the new dish to the menu list.
 */
export const checkMealMenu = async (body: any) => {

    const mealExist = body.Meal;
    const ListObj = body.List[0];
    const Itemname: string = ListObj.ItemName;
    console.log(mealExist, "mealExit", ListObj, "LIstobj", Itemname, "Itemname");

    const findMealinDb: any = await MenuModel.findOne(
        {
            Meal: mealExist.toLowerCase(),

        }, {
        List: 1
    }
    );

    console.log("finding Meal in Database");

    if (!findMealinDb) {

        const menuAdd = await MenuModel.create(body);

        console.log(menuAdd, "menuAddin the creation of object");

        return `Menu created with the Dishes successfully`;

    }
    else {
        console.log(findMealinDb.List, "list");

        let dishexist: boolean = true;

        for (const ele of findMealinDb.List) {
            if (ele.ItemName === Itemname) {
                console.log(ele.ItemName, "itemName", Itemname, "itemname");
                dishexist = false;
                break;
            };
        }

        console.log(dishexist, "dishexist in Menucreate");

        if (!dishexist) {
            return `Dish ${Itemname} allready exist in the Menu ${mealExist} `;
        }
        else {

            const AddDishMenu = await MenuModel.updateOne({
                Meal: mealExist.toLowerCase(),
            },
                {
                    $push: {
                        List: ListObj
                    }
                });
            if (!AddDishMenu) {
                return `something went wrong`;
            }
            return `Dish Added successfully`;
        }

    }
}