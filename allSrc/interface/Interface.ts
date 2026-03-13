/**
 * Represents a user interacting with the system.
 *
 * This interface stores the basic contact and identification
 * details of a user such as name, address, email, and mobile number.
 *
 * The `Time` field represents the timestamp when the user interacts
 * with the system (for example placing an order or making a request).
 * This value should be generated on the backend to ensure accuracy
 * and prevent manipulation from the client side.
 */
export interface Usertype {
  name: string;
  address: string;
  email: string;
  mobile: number;
  Time: Date;
}


/**
 * Represents a single ingredient used in the preparation of a dish.
 *
 * Each ingredient contains the ingredient name, its unit price,
 * and the quantity used for preparing the dish.
 *
 * This structure is mainly used for:
 * - Dish ingredient mapping
 * - Ingredient cost calculation
 * - Stock deduction logic
 */
export interface IngList {
  Ing: string;
  Price: number;
  QuantUse: number;
}


/**
 * Represents a dish along with the list of ingredients required
 * to prepare it.
 *
 * This interface connects a dish name to its ingredient list.
 * It is useful for:
 * - Recipe storage
 * - Automatic stock deduction
 * - Ingredient cost calculation
 */
export interface DishIngListType {
  ItemName: string;
  Ingredient: IngList[];
}


/**
 * Represents a single dish available in a menu.
 *
 * Each dish includes:
 * - Name of the item
 * - Description of the dish
 * - Selling price (DishRate)
 *
 * This interface is typically used when displaying dishes
 * to customers or storing menu data.
 */
export interface DishList {
  ItemName: string;
  Description: string;
  DishRate: number;
}


/**
 * Represents a menu configuration for a specific meal time.
 *
 * A menu defines:
 * - Start and end time during which the menu is active
 * - The meal category (Breakfast, Lunch, Dinner, etc.)
 * - The list of dishes available during that time period
 *
 * This helps in dynamically switching menus based on time.
 */
export interface Menutype {
  StartTime: Date;
  EndTime: Date;
  Meal: string;
  List: DishList[];
}


/**
 * Represents a standardized API response object returned
 * by the backend.
 *
 * This structure ensures consistency across all API responses
 * by including:
 * - Success status
 * - HTTP status code
 * - Informational message
 * - Response data payload
 * - Timestamp of the response
 */
export interface resObjtype {
  success: boolean,
  statusCode: number,
  message: string,
  data: any,
  timeStamp: string
}


/**
 * Represents the stock information of a specific ingredient.
 *
 * This interface is used to track ingredient inventory in the system.
 * It includes:
 * - Ingredient name
 * - Item number or identifier
 * - Total available quantity in stock
 *
 * It is commonly used for inventory management and automatic
 * deduction when dishes are prepared.
 */
export interface IngredientStocktype {
  IngredientName: string
  ItemNumber: number
  TotalQuantity: number
}


/**
 * Represents aggregated order information for a specific meal
 * during a day.
 *
 * It stores:
 * - The meal category (Breakfast, Lunch, etc.)
 * - Total number of dishes sold for that meal
 * - Total revenue generated for that meal
 */
export interface OrderListType{
  Menu:string,
  TotalDishes:number,
  TotalAmount:number,
}


/**
 * Represents the complete sales record for a single day.
 *
 * This object stores:
 * - The sale date
 * - Total revenue generated during the day
 * - Total number of dishes sold across all meals
 * - Breakdown of sales by meal type
 *
 * This structure is useful for:
 * - Daily sales reports
 * - Revenue analytics
 * - Restaurant performance tracking
 */
export interface SalesbyDailyObjtype{
  SaleDate:Date|string,
  DailyTotal:number,
  Totaldishes:number,
  AllDayOrder:OrderListType[]
}