import { SalesbyDailyObjtype } from "../interface/Interface";
import KitchenObj from "../KitchenSrc/KitchenServices/Kitchen.service";



/**
 * Case 1: Create Daily Sales Object
 *
 * Creates a new daily sales document when no sales record exists
 * for the given date. Initializes the daily total and first meal entry.
 */
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
/**
 * Case 2: Create Meal Entry
 *
 * Adds a new meal entry inside the existing daily sales object
 * when the meal type (breakfast/lunch/dinner) is not yet recorded.
 */
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

/**
 * Case 3: Update Existing Meal Entry
 *
 * Updates the sales values of an already existing meal entry by
 * increasing total amount, total dishes, and daily totals.
 */
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

export { updateMealEntry, createMealEntries, createObjByDate };