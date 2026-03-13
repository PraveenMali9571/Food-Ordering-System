import express from "express";
import { UserCreate } from "../controllers/UserController";
const UserRouter = express.Router();

    // Route for creation of User or came of user as a restaurant flow
UserRouter.post("/UserCame",UserCreate);

export default UserRouter;