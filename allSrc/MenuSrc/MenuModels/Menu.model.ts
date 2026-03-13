import mongoose from "mongoose";
import {DishIngListType, DishList, IngList, Menutype} from "../../interface/Interface";

const {Schema, model} = mongoose;


// <======================== DISH INGRIDEINT LIST SCHEMA ====================>

const IngredientSchema= new Schema<IngList>({

    Ing:{
        type: String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    QuantUse:{
        type:Number,
        required:true
    }
})

const DishIngSchema= new Schema<DishIngListType>({
    ItemName:{
            type:String,
            required:true
        },
        Ingredient:[IngredientSchema]
       
})

const DishIngModel = model<DishIngListType>('DishIngModel',DishIngSchema);


// <======================== MENU SCHEMA ====================>

const DishListSchema= new Schema<DishList>({

        ItemName:{
            type:String,
            required:true
        },
        Description:{
            type:String,
            required:true
        },
        DishRate:{
            type:Number,
            required:true
        },

})


const MenuSchema= new Schema<Menutype>({

    StartTime:{
        type:Date,
        required:true
    },
    EndTime:{
        type:Date,
        required:true
    },
    Meal:{
        type:String,
        required:true,
    },

    List:[DishListSchema],
   

})

const MenuModel= model<Menutype>('MenuModel',MenuSchema);

export { MenuModel,DishIngModel};