import { Router } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  editEnrollment,
  getEnrollment,
  getEnrollments,
} from "../controllers/enrollment-controller";

export const enrollmentRouter = Router();
enrollmentRouter.post("/new", createEnrollment);

enrollmentRouter.get("/all/:status", getEnrollments);
enrollmentRouter.get("/:id", getEnrollment);
enrollmentRouter.put("/edit/:id", editEnrollment);
enrollmentRouter.delete("/delete/:id", deleteEnrollment);
