import { Router } from "express";
import {
  createCenter,
  getCenter,
  editCenter,
} from "../controllers/center-controller";
const centerRouter = Router();

centerRouter.post("/new", createCenter);
centerRouter.get("/:id", getCenter);
centerRouter.put("/edit/:id", editCenter);

export { centerRouter };
