import express from "express";
import { UserCreate } from "../controllers/User-controller.ts";
const UserRouter = express.Router();

    // All the Routes
UserRouter.post("/UserCame",UserCreate);

export default UserRouter;