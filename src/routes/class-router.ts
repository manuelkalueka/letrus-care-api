import { Router } from "express";
import {
  createClass,
  getClass,
  editClass,
  getClasses,
  updateClassStatus,
} from "../controllers/class-controller";
const classRouter = Router();

classRouter.post("/new", createClass);
classRouter.get("/all/:centerId", getClasses);
classRouter.get("/:id", getClass);
classRouter.put("/edit/:id", editClass);
classRouter.patch("/:id/status", updateClassStatus);
export { classRouter };
