import express from "express";
import { UserCreate } from "../controllers/UserController";

const UserRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User entry and restaurant flow management
 */

/**
 * @swagger
 * /UserCame:
 *   post:
 *     summary: Register user arrival and return meal menu
 *     tags: [User]
 *     description: |
 *       This endpoint simulates a customer entering the restaurant.
 *       When a user arrives, their information is stored in the database
 *       and the system automatically determines the current meal time
 *       (breakfast, lunch, or dinner).
 *
 *       Based on the detected meal time, the corresponding menu is returned
 *       so the user can see available dishes to order.
 *
 *       This route initiates the **restaurant user journey flow**.
 *
 *       Flow:
 *       User enters restaurant → User stored in database → Meal time detected → Menu returned
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Praveen Mali
 *               address:
 *                 type: string
 *                 example: Rajasthan, India
 *               email:
 *                 type: string
 *                 example: praveen@email.com
 *               mobile:
 *                 type: number
 *                 example: 9876543210
 *
 *     responses:
 *       200:
 *         description: User created and menu returned
 *       500:
 *         description: Server error
 */

/**
 * Route: User Entry / User Creation
 *
 * This route represents the entry point of a user in the restaurant system.
 * When a user arrives, their information is stored in the database and
 * the backend automatically determines the current meal time and returns
 * the corresponding menu.
 *
 * This maintains the restaurant flow cycle where a user arrives,
 * sees the available menu, and then proceeds to order dishes.
 */
UserRouter.post("/UserCame", UserCreate);

export default UserRouter;