import express from "express";
import { UserCreate } from "../controllers/UserController.ts";
const UserRouter = express.Router();

    // All the Routes
UserRouter.post("/UserCame",UserCreate);

export default UserRouter;