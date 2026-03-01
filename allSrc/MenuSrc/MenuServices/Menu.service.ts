import { MenuModel, DishIngModel } from "../MenuModels/Menu.model";

class Menu {

    async createMenu(body: any) {
        try {

            const menuAdd = await MenuModel.create(body);

            console.log("above return statment menuadd", menuAdd);

            if (!menuAdd) {

                console.log("in the menuAdd");
                throw new Error("something wrong in this side of menuAdd function");

            }

            console.log("below menuAdd");

            return "successfully added menu";

        }
        catch (err: any) {
            throw new Error(`something wrong happened ${err}`);
        }

    }

    async createDish(Ingbody: any) {
        try {

            const IngData = await DishIngModel.create(Ingbody);

            if (!IngData) {

                throw new Error("error in  Dish ingrident");
            }

            return "successfully added Dish ingredent";
        }
        catch (err: any) {

            throw new Error(`${err} error in createDish method`);

        }
    }

    async readMenu(Meal: any) {
        try {
            const reData = await MenuModel.find({ Meal: Meal },
                { List: 1, _id: 1 }
            );
            if(!reData){
                throw new Error(reData);
            }
            // console.log(reData, "redata", Meal, "meal",typeof Meal, "typeof it");
            // const menulist= reData?.List;
            return reData;
        }
        catch (err: any) {
            // console.log(reData);
            throw new Error(`error in the read side ${err}`);
        }
    }

    async readDish(Dish:any){
        try{
            const reDish= await DishIngModel.find(
                {
                ItemName:Dish
            },
            {
                    ItemName:1,
                    Ingredient:1
                });
                

                console.log(reDish);

          return reDish;
            // if(!reDish){
            //     throw
            // }
        }
        catch(err:any){
            throw new Error(`Error in the readDish Side`);
        }
    }

}

const MenuObj = new Menu();
export default MenuObj;

