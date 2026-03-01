
// <==================== USER INTERFACE ==============================>

export interface Usertype {
  name: String;
  address:String;
  email:String;
  mobile:Number;
  Time:Date;
};

// <======================== DISH INGRIDEINT LIST INTERFACE ====================>

export interface IngList{
  Ing:String;
  Price:Number;
  QuantUse:Number;
}

export interface DishIngListType{
  ItemName:String;
  Ingredient:IngList[];

}


// <======================== MENU INTERFACE ====================>

export interface DishList{
  ItemName:String;
  Description:String;
  DishRate:Number;
}
export interface Menutype{
  StartTime:Date;
  EndTime:Date;
  Meal:String;
  List:DishList[];
}
