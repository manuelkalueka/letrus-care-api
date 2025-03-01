import { Router } from "express";
import {
  createTeacher,
  editTeacher,
  updateTeacherStatus,
  getTeacher,
  getTeachers,
  getTeachersAll,
} from "../controllers/teacher-controller";

export const teacherRouter = Router();
teacherRouter.post("/new", createTeacher);
teacherRouter.get("/all/:centerId", getTeachersAll);
teacherRouter.get("/all/paginated/:centerId", getTeachers);

teacherRouter.get("/:id", getTeacher);
teacherRouter.put("/edit/:id", editTeacher);
teacherRouter.patch("/:id/:status", updateTeacherStatus);
