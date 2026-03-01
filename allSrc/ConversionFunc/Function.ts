
import MenuObj from "../MenuSrc/MenuServices/Menu.service";



// <=========================== FUNCTION FOR GIVING AN MEAL AS A TIME ==================>

export const TimetoMeal=async(Time:any)=>{
        try{
            const Menumeal = paraMeal(Time);
            const menudt = await MenuObj.readMenu(Menumeal);

            if(!menudt){
                throw new Error(` error in menudata ${menudt}`);
            }
             return menudt;
             // console.log(menudt,"menudata or list from api");
        }
        catch(err:any){
            throw new Error(`error in the time to meal side`);
        }


}

function paraMeal(Tm:any){
        let now= new Date(Tm);
        let Hr=now.getHours();
        let Mn=now.getMinutes();
        let cmtime:String=`${Hr}:${Mn}`;
        
        if(`7:30`<=cmtime &&cmtime<=`11:30`){
            
            console.log("breakfast");
            return `breakfast`;
            
        }
        else if(`11:31`<=cmtime &&cmtime<=`18:30`){

        console.log(`lunch`);
            return `lunch`;   

        }
     else if(`18:31`<=cmtime &&cmtime<=`20:30`){
            console.log("dinner");
            return `dinner`;
        }
        else{
            console.log("default");
                return `default`;
        }
}
// {
//   "_id": {
//     "$oid": "69a4483a8f4d92e817317abb"
//   },
//   "ItemName": "Chole Bhature",
//   "Ingredient": [
//     {
//       "Ing": "Chickpeas",
//       "Price": 35,
//       "QuantUse": 200
//     },
//     {
//       "Ing": "Flour",
//       "Price": 20,
//       "QuantUse": 150
//     },
//     {
//       "Ing": "Oil",
//       "Price": 15,
//       "QuantUse": 30
//     },
//     {
//       "Ing": "Spices",
//       "Price": 10,
//       "QuantUse": 20
//     }
//   ]
// }
// // <========================== FUNCTION FOR KITCHEN ======================>

// const Kitchen =(DishIngObj)=>{

// }