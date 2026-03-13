// import { SalesbyDailyObjtype } from "../interface/Interface";
import { IngredientStockModel } from "../KitchenSrc/KitchenModels/Kitchen.model";
import KitchenObj from "../KitchenSrc/KitchenServices/Kitchen.service";
import MenuObj from "../MenuSrc/MenuServices/Menu.service";
import { createMealEntries, createObjByDate, updateMealEntry } from "./CaseForSaleFunc";
// import { paraMeal } from "./Function";

// <================ FUNCTION TO PERFORM THE SALES OPERATION ==================>
/**
 * Determines how the daily sales record should be updated.
 *
 * It checks whether a sales document exists for the given date and
 * decides between three cases: create a new daily sales object,
 * add a new meal entry, or update an existing meal entry.
 */
const findingOperation = async (PresentDate: Date | string, MealBytime: string, itemName: string) => {

    const SaleObjbyDb = await KitchenObj.readSalebyDate(PresentDate);
    console.log("saleobjd finding operation");
    const SaleOrderArr: any = SaleObjbyDb?.["AllDayOrder"] || [];

    const menudt = await MenuObj.readMenu(MealBytime);
    const dishRate = menudt.List.find((ele: any) => {
        ele.ItemName === itemName
    })?.DishRate || 0;
    console.log("below menudt ");
    let totalamount: number = dishRate;
    let totaldishes: number = 1;
    let meal = "";

    let mealfound = false;

    for (const ele of SaleOrderArr) {

        if (ele.Menu === MealBytime) {
            mealfound = true;
            meal = ele.Menu;
            totalamount = ele.TotalAmount + dishRate;
            totaldishes = ele.TotalDishes + 1;

        }
    }

    let dailytotal: number = (SaleObjbyDb?.["DailyTotal"] || 0) + dishRate;
    let alldishes: number = (SaleObjbyDb?.["Totaldishes"] || 0) + 1; //whole day order

    const result = {
        Menu: meal,
        TotalAmount: totalamount,
        TotalDishes: totaldishes
    };

    // CASE 1 -> No sale object for date
    if (!SaleObjbyDb) {
        console.log("case 1 run")
        return await createObjByDate(
            PresentDate,
            MealBytime,
            dailytotal,
            totalamount,
            totaldishes,
            alldishes
        );
    }
    // CASE 2 -> Sale object exists but meal not found
    else if (!mealfound) {
         console.log("case 2 run")
        return await createMealEntries(
            PresentDate,
            result,
            dailytotal,
            alldishes
        );
    }
    // CASE 3 -> Meal exists -> update values
    else {
         console.log("case 3 run")
        return await updateMealEntry(
            PresentDate,
            MealBytime,
            totalamount,
            totaldishes,
            dailytotal,
            alldishes
        );
    }
};

/**
 * Executes the complete daily sales workflow when a dish is ordered.
 *
 * It updates the daily sales record and deducts ingredient quantities
 * from kitchen inventory simultaneously. Both operations run in
 * parallel to keep order processing fast.
 */

export const salesbyDaily = async function (DishObj: any,MealBytime:string,itemName:string) {
    const now = new Date();
    const PresentDate = now.toLocaleDateString('en-CA'); // "2026-03-07" in this format
   

    console.log(DishObj,"dishobject in the parameter salesdaily function",itemName,"itemname");
    const IngArr = DishObj?.["Ingredient"];

    console.log(IngArr,"IngArr of the array ");
    const [whichOperationResult, UpdateQuantleftResult] = await Promise.allSettled([

        findingOperation(PresentDate, MealBytime, itemName),
        totalQuantandDishQuant(IngArr)

    ]);

    let whichOperation: any;
    let UpdateQuantleft: any;


    if (whichOperationResult.status === "fulfilled") {

        console.log("promise whichOperation resolve");
        whichOperation = whichOperationResult.value;

    } else {
        console.error(whichOperationResult.reason);
        return whichOperationResult.reason;

    }

    if (UpdateQuantleftResult.status === "fulfilled") {
        
        console.log("promise sale also resolve in kitchenprocess function");
        UpdateQuantleft = UpdateQuantleftResult.value;

    } else {

        console.error(UpdateQuantleftResult.reason);
        return UpdateQuantleftResult.reason;

    }

    if (whichOperation && UpdateQuantleft) {
        return true;
    } 
    else {
        return `both promises are not resolve whichOperation and UpdateQuantleft`;
    }
}
    


//  <===============FUNCTION TO FIND HOW MANY INGREDIENT LEFT AFTER DISH MAKING ============>
/**
 * Updates kitchen inventory after a dish is prepared.
 *
 * For each ingredient used in the dish, the function deducts the
 * required quantity from the stock using an atomic database update.
 */

const totalQuantandDishQuant = async function (IngArr: any) {

    for (const ele of IngArr) {

        const ing = ele.Ing;
        const QuantUse = ele.QuantUse;

        await IngredientStockModel.updateOne(
            { IngredientName: ing },
            {
                $inc: { TotalQuantity: -QuantUse }
            }
        );

    }
    return true;

}