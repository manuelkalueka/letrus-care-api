import { Router } from "express";
import { createCenter } from "../controllers/center-controller";
const centerRouter = Router();

centerRouter.post("/new", createCenter);

export { centerRouter };
