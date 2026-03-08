
import MenuObj from "../MenuSrc/MenuServices/Menu.service";
import { SalesbyDailyObjtype } from "../interface/Interface";
import { IngredientStockModel } from "../KitchenSrc/KitchenModels/Kitchen.model";
import KitchenObj from "../KitchenSrc/KitchenServices/Kitchen.service";


// <=========================== FUNCTION FOR GIVING AN MEAL AS A TIME ==================>

export const getMealTypeByTime = async (Time: any) => {
    try {
        const Menumeal = paraMeal(Time);
        const menudt = await MenuObj.readMenu(Menumeal);

        if (!menudt) {
            throw new Error('No menu data found for the requested time');
        }
        return menudt;
    }
    catch (err: any) {
        throw new Error('failed to fetched the Menu Data');
    }


}

function paraMeal(Tm: any) {
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

const ArrOrder: any = [];
export const KitchenProcess = async (DishIngObj: any, onWaiting: Function) => {

    DishIngObj["oid"] = ArrOrder.length;
    ArrOrder.unshift(DishIngObj);

    onWaiting({ status: "waiting" });

    const timerOn: any = await interval(DishIngObj.oid);
    const saleInsert = await salesbyDaily(DishIngObj);

    if (timerOn && saleInsert) {

        console.log("timerOn send", timerOn);
        return timerOn;
    }

}

// <================ FUNCTION TO PERFORM THE SALES OPERATION ==================>

const findingOperation = async (PresentDate: Date | string, MealBytime: string, itemName: string) => {
    const SaleObjbyDb = await KitchenObj.readSalebyDate(PresentDate);

    const SaleOrderArr: any = SaleObjbyDb?.["AllDayOrder"] || [];

    const menudt = await MenuObj.readMenu(MealBytime);
    const dishRate = menudt.List.find((ele: any) => {
        ele.ItemName === itemName
    })?.DishRate || 0;

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

        return await createMealEntries(
            PresentDate,
            result,
            dailytotal,
            alldishes
        );
    }
    // CASE 3 -> Meal exists -> update values
    else {

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


const salesbyDaily = async function (DishObj: any) {
    const now = new Date();
    const PresentDate = now.toLocaleDateString('en-CA'); // "2026-03-07" in this format
    const MealBytime = paraMeal(now);

    const itemName = DishObj?.["ItemName"];
    const IngArr = DishObj?.["Ingredient"];

    const whichOperation = await findingOperation(PresentDate, MealBytime, itemName);
    const UpdatedQuantleft = await totalQuantandDishQuant(IngArr);

    if (whichOperation && UpdatedQuantleft) {
        return true;
    }
}

//  <===============FUNCTION TO FIND HOW MANY INGREDIENT LEFT AFTER DISH MAKING ============>
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