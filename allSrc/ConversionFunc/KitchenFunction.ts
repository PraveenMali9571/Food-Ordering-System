
import { IngredientStockModel } from "../KitchenSrc/KitchenModels/Kitchen.model";
import KitchenObj from "../KitchenSrc/KitchenServices/Kitchen.service";
import { DishIngModel } from "../MenuSrc/MenuModels/Menu.model";
import { getMealTypeByTime, paraMeal } from "./Function";
import { salesbyDaily } from "./SaleFunction";

// <========================== FUNCTION FOR KITCHEN ======================>

const interval = (oid: number) => {
    let count = 0;
    return new Promise((resolve) => {

        let timer = setInterval(() => {
            count++;
            console.log(count, "count");

            if (count === 30) {
                clearInterval(timer);
                delete ArrOrder[oid - 1];
                console.log(ArrOrder, "array in the interval");
                resolve({ status: "complete", data: "food is Ready" });
            }
        }, 1000);
    })

}

/**
 * Handles the complete kitchen workflow for a dish order.
 *
 * Validates whether the dish exists in the current meal menu,
 * starts the cooking timer, and updates the daily sales record.
 * It also sends intermediate status updates such as "waiting"
 * and returns the final completion status when the dish is ready.
 */
const ArrOrder: any = [];
export const KitchenProcess = async (DishIngObj: any, onWaiting: Function) => {
    const nowt = new Date();
    // const nowt = "20:00";
    DishIngObj["oid"] = ArrOrder.length;
    ArrOrder.unshift(DishIngObj);
    const itemName = DishIngObj?.["ItemName"];

    onWaiting({ status: "waiting" });

    const MealBytime = paraMeal(nowt);
    console.log(MealBytime, "Mealby time ");

    const Menu: any = await getMealTypeByTime(nowt);
    // console.log(Menu,"Menu");

    let DishInTheMenu: boolean = false;

    for (const ele of Menu.List) {
        if (itemName === ele.ItemName) {
            console.log(itemName, "itemname", ele.ItemName, "Menu side element");
            DishInTheMenu = true;
            break;
        }
    }

    if (DishInTheMenu) {

        const [timerResult, saleInsertResult] = await Promise.allSettled([
            interval(DishIngObj.oid),
            salesbyDaily(DishIngObj, MealBytime, itemName)
        ]);
        let timerOn: any;
        let saleInsert: any;

        if (timerResult.status === "fulfilled") {
            console.log("promise timeron resolve");
            timerOn = timerResult.value;
        } else {
            console.error(timerResult.reason);
            return timerResult.reason;
        }

        if (saleInsertResult.status === "fulfilled") {
            console.log("promise sale also resolve in kitchenprocess function");
            saleInsert = saleInsertResult.value;
        } else {
            console.error(saleInsertResult.reason);
            return saleInsertResult.reason;
        }

        console.log("saleInsert below");

        if (timerOn && saleInsert) {

            console.log("timerOn send", timerOn);
            return timerOn;
        }
        else {
            return `failed to fetch data or promise got any error`;
        }
    }

    else {
        return " Please enter correct  Meal at time ";
    }

}

// <==================FUNCTION FOR THE DISH CREATION WITH THE INGREDIENT ALSO ADD IN IT ============>

/**
 * Manages creation or update of dish ingredient mappings.
 *
 * If the dish does not exist, it creates a new dish with its
 * ingredient list. If the dish already exists, it checks for
 * duplicate ingredients and adds only new ingredients to the dish.
 */
export const checkAddDishAddIng = async (Ingbody: any) => {
    const DishName = Ingbody.ItemName;

    const IngredientArr = Ingbody.Ingredient;
    console.log(IngredientArr, "ingredient Array", DishName, "DishName");
    const findDish = await DishIngModel.findOne({
        ItemName: DishName
    })

    if (!findDish) {
        const IngData = await DishIngModel.create(Ingbody);
        if (!IngData) {
            return `failed to Add the Dish in the Db`;
        }
        return `Dish Added Successfully`;
    }
    else {
        let Ingexist: boolean = false;

        for (let ArrEle of IngredientArr) {
            let userIng = ArrEle.Ing;
            console.log(userIng, "UserIngredient");
            for (let ele of findDish.Ingredient) {
                console.log(ele, "ele of the findDish");
                if (ele.Ing === userIng) {
                    Ingexist = true;
                    console.log(userIng, "userIng");
                    return `${userIng} this ingredient already exist in the Dish`;
                }
            }
        }
        console.log(Ingexist, "Ingexist");

        if (IngredientArr.length > 0 && !Ingexist) {
            let count = 0;
            for (let ele of IngredientArr) {

                const addIng = await DishIngModel.updateOne({
                    ItemName: DishName,

                }, {
                    $push: {

                        Ingredient: ele
                    }
                })
                count++;

            }
            if (IngredientArr.length === count) {
                return `Ingredient added successfully`;
            }

        } else {
            return `No Ingredient Data available `;
        }
    }

}

export const checkforInventoryStock = async (inventBody: any)=>{
    const ingname = inventBody.IngredientName;
    const dataInDb = await KitchenObj.readbyIngName(ingname);

    if (!dataInDb) {
        const AddIngredientInStock = await IngredientStockModel.create(inventBody);
        if (!AddIngredientInStock) {
            return `failed to add the data in the Ingredient Stock`;
        }
        return AddIngredientInStock;
    } else {
        return `Ingredient is already in the Stock ${dataInDb}`;
    }

}