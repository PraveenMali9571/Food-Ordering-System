import { SalesbyDailyObjtype } from "../../interface/Interface";
import { IngredientStockModel, SalesbyDailyModel } from "../KitchenModels/Kitchen.model";

class Kitchen {


    // <========================== FUNCTION TO CREATE KITCHEN INGREDIENT INVENTORY================>
    async createKitchenInventory(inventBody: any) {
        try {
            const inventoryIngData = await IngredientStockModel.create(inventBody);
            if (!inventoryIngData) {
                throw new Error("Error occur in the database side ");
            }
            return inventoryIngData;

        } catch (err) {
            throw new Error("failed to create inventory");
        }
    }




    // <================================FUNCTION TO CREATE SALES DAILY BY MENU====================>
    async createKitchenSalesDaily(SaleObjbyDb: SalesbyDailyObjtype) {
        try {
            const salesData = await SalesbyDailyModel.create(SaleObjbyDb);
            if (!salesData) {
                throw new Error("failed to create an sales sheet");
            }
            return salesData;
        }
        catch (err) {
            throw new Error("failed to create");
        }
    }





    // <====================================FUNCTION TO READ SALE DATA FROM DB===================>
    async readSalebyDate(CurrentDate: Date | String) {
        try {
            const SaleObjbyDb = await SalesbyDailyModel.findOne(
                {
                    SaleDate: CurrentDate,
                },
            )
            return SaleObjbyDb;

        } catch (err) {
            throw new Error("failed to find or fetch the Sale Date Daily");
        }
    }




    // <=================================================FUNCTION TO CREATE MEAL ENTRY IN THE SALE DATA IN DB BY MENU==========================>

    async createMealEntry(PresentDate: Date | string,
        result: any,
        dailytotal: number,
        alldishes: number
    ) {
        try {
            const createEntryorUpdate = await SalesbyDailyModel.updateOne(
                {
                    SaleDate: PresentDate,
                },
                {
                    $set: {
                        "DailyTotal": dailytotal,
                        "Totaldishes": alldishes,
                    },
                    $push: {
                        "AllDayOrder": {
                            result,
                        }
                    }

                }
            );

            if (!createEntryorUpdate) {
                throw new Error("failed to add the data");
            }
            return createEntryorUpdate;

        } catch (err) {
            throw new Error("failed to create an new Entry");
        }
    }




    // <=============================FUNCTION TO UPDATE THE SALE DATA IN THE DB ====================>
    async updateMeal(PresentDate: Date | string,
        MealBytime: string,
        totalamount: number,
        totaldishes: number,
        dailytotal: number,
        alldishes: number
    ) {
        try {
            const updateMealObj = await SalesbyDailyModel.updateOne(
                { "SaleDate": PresentDate, "AllDayOrder.Menu": MealBytime },
                {
                    $inc: {
                        "AllDayOrder.$.TotalAmount": totalamount,
                        "AllDayOrder.$.TotalDishes": totaldishes,
                        DailyTotal: dailytotal,
                        AllDishes: alldishes
                    }
                }
            )
            if (!updateMealObj) {
                throw new Error("error in the updating side ")
            }
            return updateMealObj;
        }
        catch (err) {
            throw new Error("failed to create an new Entry");
        }



    }
}
const KitchenObj = new Kitchen();
export default KitchenObj;
