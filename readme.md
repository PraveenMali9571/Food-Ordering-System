# 🍽️ Food Ordering System (Backend)

Food Ordering System is a **backend-driven restaurant workflow simulation** built with **Node.js, Express, TypeScript, and MongoDB**.

Instead of building the system purely as a frontend API service, this project focuses on **simulating the real operational flow inside a restaurant when a customer enters and orders food**.

Although the frontend interaction may appear simple, the backend automatically performs several processes behind the scenes such as:

* Detecting meal time
* Fetching menu
* Processing kitchen orders
* Deducting ingredient inventory
* Updating daily sales
* Simulating dish preparation

This project demonstrates **backend architecture design, asynchronous workflow handling, and modular service structure**.

---

# 🌐 Live Deployment

Backend API

```
https://food-ordering-system-krw7.onrender.com
```

Swagger Documentation

```
https://food-ordering-system-krw7.onrender.com/api-docs
```

GitHub Repository

```
https://github.com/PraveenMali9571/Food-Ordering-System
```

---

# 🎯 Project Philosophy

This project is **not designed primarily as a frontend API integration system**.

Instead, it focuses on modeling **what actually happens in a restaurant environment** when a customer arrives.

The system simulates the full backend workflow.

### Restaurant Flow

```
Customer enters restaurant
        ↓
User information stored
        ↓
System determines meal time
        ↓
Menu for that meal is returned
        ↓
Customer selects dish
        ↓
Kitchen process starts
        ↓
Ingredient quantities deducted
        ↓
Daily sales updated
        ↓
Dish preparation simulated
        ↓
Dish ready
```

Many processes happen automatically in the backend while the frontend only shows simple actions.

---

# ⚙️ Technology Stack

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Swagger UI (API documentation)

## Additional Tools

* Async Promise workflow
* Modular service architecture
* Swagger API documentation
* Environment configuration

---

# 🏗️ Backend Architecture

The backend follows a **layered modular architecture**.

```
Route → Controller → Service → Model → MongoDB
```

### Flow Example

```
Client Request
     ↓
Route
     ↓
Controller
     ↓
Service Layer (Business Logic)
     ↓
Database Model
     ↓
MongoDB
```

---

# 📁 Project Structure

```
FOOD-ORDERING-SYSTEM
│
├── allSrc
│   ├── ConversionFunc
│   │   ├── Function.ts
│   │   ├── KitchenFunction.ts
│   │   └── SaleFunction.ts
│   │
│   ├── interface
│   │   └── Interface.ts
│   │
│   ├── KitchenSrc
│   │   ├── KitchenControllers
│   │   ├── KitchenModels
│   │   ├── KitchenRoutes
│   │   └── KitchenServices
│   │
│   ├── MenuSrc
│   │   ├── MenuControllers
│   │   ├── MenuModels
│   │   ├── MenuRoutes
│   │   └── MenuServices
│   │
│   ├── middleware
│   ├── utils
│   └── src
│
├── config
│   └── db.ts
│
├── dist
├── node_modules
├── .env
├── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# 📖 API Documentation

Swagger UI is integrated for API documentation.

Open Swagger:

```
https://food-ordering-system-krw7.onrender.com/api-docs
```

Swagger allows you to:

* Explore all endpoints
* Send API requests
* View request/response structures
* Test backend logic

---

# 📡 API Endpoints

## 👤 User

### POST `/UserCame`

Registers a user entering the restaurant and returns the menu for the current meal.

Example Request

```json
{
  "name": "Praveen Mali",
  "address": "Ajmer",
  "email": "praveen@email.com",
  "mobile": 9876543210
}
```

---

# 🍽️ Menu

### POST `/MenuCreate`

Create meal menu.

---

### POST `/MenuIngredient`

Add ingredient mapping for a dish.

---

### GET `/Menu/{Meal}`

Retrieve menu for breakfast, lunch, or dinner.

---

### GET `/Menu/DishOrder/{Dish}`

Order a dish and trigger backend kitchen workflow.

This automatically triggers:

```
Kitchen Process
Inventory deduction
Daily sales update
Dish preparation timer
```

---

### DELETE `/Menu/{Meal}`

Delete a meal menu.

---

### DELETE `/Menu/{DishIng}`

Delete ingredient mapping for a dish.

---

# 🍳 Kitchen

### POST `/KitchenInventory`

Create ingredient inventory.

Example:

```json
{
  "IngredientName": "Tomato",
  "ItemNumber": 1,
  "TotalQuantity": 100
}
```

---

### GET `/SalesDaily/{SaleDate}`

Retrieve daily sales statistics.

Example

```
GET /SalesDaily/2026-03-13
```

---

### GET `/Inventory/{IngName}`

Check available stock for a specific ingredient.

Example

```
GET /Inventory/Tomato
```

---

# 🔄 Order Processing Workflow

When a dish is ordered:

```
DishOrder API
     ↓
KitchenProcess
     ↓
Check dish in menu
     ↓
Start cooking timer
     ↓
Update sales data
     ↓
Deduct ingredient inventory
     ↓
Return order completion status
```

---

# 🚀 Running the Project Locally

Clone the repository

```
git clone https://github.com/PraveenMali9571/Food-Ordering-System
```

Navigate to project

```
cd Food-Ordering-System
```

Install dependencies

```
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run development server

```
npm run dev
```

Server will run on

```
http://localhost:5000
```

Swagger will be available at

```
http://localhost:5000/api-docs
```

---

# 🔮 Future Improvements

* Real-time order tracking
* WebSocket-based kitchen updates
* Inventory analytics dashboard
* Dish preparation time optimization
* Role-based restaurant management

---

# 👨‍💻 Author

**Praveen Mali**

GitHub

```
https://github.com/PraveenMali9571
```

---

# 📜 License

This project is created for **educational and portfolio purposes**.

---

