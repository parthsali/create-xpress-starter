// User Router
import express from "express";

import { exampleController } from "./userController";

const userRouter = express.Router();

userRouter.get("/", exampleController);

export default userRouter;
