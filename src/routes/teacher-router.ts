import { Router } from "express";
import {
  createTeacher,
  editTeacher,
  updateTeacherStatus,
  getTeacher,
  getTeachers,
} from "../controllers/teacher-controller";

export const teacherRouter = Router();
teacherRouter.post("/new", createTeacher);
teacherRouter.get("/all/:centerId", getTeachers);
teacherRouter.get("/:id", getTeacher);
teacherRouter.put("/edit/:id", editTeacher);
teacherRouter.patch("/:id/status", updateTeacherStatus);
