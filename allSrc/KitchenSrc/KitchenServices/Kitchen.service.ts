import { SalesbyDailyObjtype } from "../../interface/Interface";
import { IngredientStockModel, SalesbyDailyModel } from "../KitchenModels/Kitchen.model";
import { BadRequestError, InternalServerError, NotFoundError, NotImplementedError } from "../../utils/errorClasses";
import { checkforInventoryStock } from "../../ConversionFunc/KitchenFunction";

class Kitchen {

    async createKitchenInventory(inventBody: any) {
        try {
            const inventoryIngData= await checkforInventoryStock(inventBody); 
            if (!inventoryIngData) {
                throw new NotImplementedError("Error occur in the database side ");
            }
            return inventoryIngData;

        } catch (err) {
            throw new InternalServerError("failed to create inventory\n\n");
        }
    }

    async createKitchenSalesDaily(SaleObjbyDb: SalesbyDailyObjtype) {
        try {
            const salesData = await SalesbyDailyModel.create(SaleObjbyDb);
            if (!salesData) {
                throw new NotImplementedError("failed to create an sales sheet");
            }
            return salesData;
        }
        catch (err) {
            throw new InternalServerError("failed to create");
        }
    }

    async readSalebyDate(CurrentDate: Date | string) {
        try {
            const SaleObjbyDb:any = await SalesbyDailyModel.findOne(
                {
                    SaleDate: CurrentDate,
                },
            )
            if(!SaleObjbyDb){
                throw new BadRequestError(`current date sale is not available`);
            }
            return SaleObjbyDb;

        } catch (err) {
            throw new InternalServerError("failed to find or fetch the Sale Date Daily");
        }
    }

    async readbyIngName(IngName:string){
        const IngredientInStock:any= await IngredientStockModel.findOne(
            {
                IngredientName:IngName
            }
        )
        if(!IngredientInStock){
            throw new NotFoundError("Ingredient Not Found in the Stock ");
        }
        return IngredientInStock;
    }
    async createMealEntry(
        PresentDate: Date | string,
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
                throw new NotImplementedError("failed to add the data");
            }
            return createEntryorUpdate;

        } catch (err) {
            throw new InternalServerError("failed to create an new Entry");
        }
    }

    async updateMeal(
        PresentDate: Date | string,
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
                throw new NotImplementedError("error in the updating side ")
            }
            return updateMealObj;
        }
        catch (err) {
            throw new InternalServerError("failed to create an new Entry");
        }
    }
}

const KitchenObj = new Kitchen();
export default KitchenObj;