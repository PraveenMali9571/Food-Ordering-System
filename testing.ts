// const DishIngObj = {
//   _id: { $oid: "69a4483a8f4d92e817317abb" },
//   ItemName: "Chole Bhature",
//   Ingredient: [
//     { Ing: "Chickpeas", Price: 35, QuantUse: 200 },
//     { Ing: "Flour", Price: 20, QuantUse: 150 },
//     { Ing: "Oil", Price: 15, QuantUse: 30 },
//     { Ing: "Spices", Price: 10, QuantUse: 20 }
//   ]
// };
// function sendToDelivery(msg:any) {
//   console.log("Delivery system received:", msg);
// }

// const KitchenProcess = async (DishIngObj:any) => {

//   ArrOrder.unshift(DishIngObj);

//   DishIngObj.oid = ArrOrder.length;

//   console.log("food is cooking...");

//   const result = await interval(DishIngObj.oid);

//   console.log(result);

//   sendToDelivery(result);

// };
// const ArrOrder:any= [];

// const interval = (oid:number) => {
//   return new Promise((resolve) => {

//     let count = 0;

//     const timer = setInterval(() => {
//       count++;
//       console.log(count, "count");

//       if (count === 10) {
//         clearInterval(timer);

//         delete ArrOrder[oid - 1];

//         console.log("Order completed");
//         console.log(ArrOrder, "array after delete");

//         resolve("food ready"); // return value AFTER timer finishes
//       }

//     }, 1000);

//   });
// };
// KitchenProcess(DishIngObj);

const Saleobj:any= {
    "SaleDate": "2023-10-25", // Representing PresentDate
    "DailyTotal": 1450.75,    // Representing dt (Daily Total)
    "Totaldishes": 42,        // Representing alldishes
    "AllDayOrder": [
        {
            "Menu": "Breakfast", // Representing MealBytime
            "TotalAmount": 350.25, // Representing tm
            "TotalDishes": 12      // Representing td
        },
        {
            "Menu": "Lunch",
            "TotalAmount": 620.50,
            "TotalDishes": 18
        },
        {
            "Menu": "Dinner",
            "TotalAmount": 480.00,
            "TotalDishes": 12
        }
    ]
};
var tm:number=0;
var td:number=0;

const arra = Saleobj?.["AllDayOrder"];
const  slb= arra.filter((ele:any) => {
    // console.log(ele?.["Menu"]);
    tm += ele["TotalAmount"];
    console.log(tm,"tm");

    td+= ele["TotalDishes"];
console.log(td);
        // const totalAm  += tm;
       if( ele?.["Menu"]==="Dinner"){
        // return console.log("dinner");
        const me:string= "dinner"
        return { tm ,td,me};
       }
    
});


console.log(slb);





console.log(Saleobj.SaleDate,"date");
console.log(Saleobj["AllDayOrder"][0]?.["Menu"],"Menuof first index");
