import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getInactiveCourses,
  getCourse,
  getCourses,
} from "../controllers/course-controller";

export const courseRouter = Router();
courseRouter.post("/new", createCourse);

courseRouter.get("/all/:centerId", getCourses);
courseRouter.get("/inactive", getInactiveCourses);
courseRouter.get("/:id", getCourse);
courseRouter.put("/edit/:id", editCourse);
courseRouter.patch("/delete/:id", deleteCourse);
