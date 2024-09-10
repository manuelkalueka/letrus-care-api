import { Router } from "express";
import {
  createCenter,
  getCenter,
  editCenter,
  getCenterByCreateBy,
} from "../controllers/center-controller";
const centerRouter = Router();

centerRouter.post("/new", createCenter);
centerRouter.get("/:id", getCenter);
centerRouter.get("/user/:createdBy", getCenterByCreateBy);
centerRouter.put("/edit/:id", editCenter);

export { centerRouter };
