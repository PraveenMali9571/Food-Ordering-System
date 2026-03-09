import { SalesbyDailyObjtype } from "../interface/Interface";
import KitchenObj from "../KitchenSrc/KitchenServices/Kitchen.service";
import { IngredientStockModel } from "../KitchenSrc/KitchenModels/Kitchen.model";
import MenuObj from "../MenuSrc/MenuServices/Menu.service";
import { paraMeal } from "./Function";



// <================FUNCTION FOR CASE 1======================>
const createObjByDate = async function (PresentDate: Date | string,
    MealBytime: string,
    dailytotal: number,
    totalamount: number,
    totaldishes: number,
    alldishes: number
) {

    const Saleobj: SalesbyDailyObjtype = {

        "SaleDate": PresentDate,
        "DailyTotal": dailytotal,
        "Totaldishes": alldishes,
        "AllDayOrder":
            [
                {
                    "Menu": MealBytime,
                    "TotalAmount": totalamount,
                    "TotalDishes": totaldishes,
                },
            ],
    };

    const KitchenSalecreate = await KitchenObj.createKitchenSalesDaily(Saleobj);

    if (KitchenSalecreate) {
        return true;
    }
}

// <===================FUNCTION FOR CASE 2 ==============>
const createMealEntries = async function (
    PresentDate: Date | string,
    result: any,
    dailytotal: number,
    alldishes: number
) {
    const createMealObj = await KitchenObj.createMealEntry(PresentDate,
        result,
        dailytotal,
        alldishes);

    if (createMealObj) {
        return true;
    }

}

// <====================FUNCTION FOR CASE 3 ==============>

const updateMealEntry = async function (
    PresentDate: Date | string,
    MealBytime: string,
    totalamount: number,
    totaldishes: number,
    dailytotal: number,
    alldishes: number
) {

    const updateMealObj = await KitchenObj.updateMeal(PresentDate,
        MealBytime,
        totalamount,
        totaldishes,
        dailytotal,
        alldishes);

    if (updateMealObj) {
        return true;
    }

}

export {updateMealEntry,createMealEntries,createObjByDate};