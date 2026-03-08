import { Schema, model } from "mongoose"
import { IngredientStocktype, OrderListType, SalesbyDailyObjtype } from "../../interface/Interface"

const IngredientStockSchema = new Schema<IngredientStocktype>({
  IngredientName: {
    type: String,
    required: true,
    unique: true
  },

  ItemNumber: {
    type: Number,
    required: true,
    unique: true
  },

  TotalQuantity: {
    type: Number,
    required: true
  }
})

export const IngredientStockModel = model<IngredientStocktype>(
  "IngredientStock",
  IngredientStockSchema
)


const OrderListSchema = new Schema<OrderListType>({
      Menu:{
        type:String,
        required:true
      },
      TotalDishes:{
        type:Number,
        required:true,

      },
      TotalAmount:{
        type:Number,
        required:true
      }
})
export const SalesbyDailySchema =new Schema<SalesbyDailyObjtype>({
    SaleDate:{
      type:Date||String,
      required:true,
      unique:true
    },
    DailyTotal:{
      type:Number,
      required:true,
    },
    Totaldishes:{
      type:Number,
      required:true
    },
    AllDayOrder:[OrderListSchema],
})

export const SalesbyDailyModel = model<SalesbyDailyObjtype>(
  "SalesbyDailyModel",SalesbyDailySchema
)