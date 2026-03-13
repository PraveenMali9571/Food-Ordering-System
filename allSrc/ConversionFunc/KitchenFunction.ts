
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

const ArrOrder: any = [];
export const KitchenProcess = async (DishIngObj: any, onWaiting: Function) => {
    const nowt = new Date();
    // const nowt = "20:00";
    DishIngObj["oid"] = ArrOrder.length;
    ArrOrder.unshift(DishIngObj);
    const itemName = DishIngObj?.["ItemName"];

    onWaiting({ status: "waiting" });

    const MealBytime = paraMeal(nowt);
    console.log(MealBytime);
    const Menu: any = await getMealTypeByTime(nowt);


    let DishInTheMenu: boolean = false;

    for (const ele of Menu) {
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
        return " Please enter correct time meal only ";
    }

}
