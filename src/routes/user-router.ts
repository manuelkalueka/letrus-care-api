import { Router } from "express";
import { createUser, loginAccount } from "../controllers/user-controller";
const userRouter = Router();

userRouter.post("/new", createUser);
userRouter.post("/login", loginAccount);

export { userRouter };
