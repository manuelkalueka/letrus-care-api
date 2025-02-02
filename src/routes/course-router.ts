import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getInactiveCourses,
  getCourse,
  getCourses,
  getCoursesWithoutLimit
} from "../controllers/course-controller";

export const courseRouter = Router();
courseRouter.post("/new", createCourse);

courseRouter.get("/all/:centerId", getCoursesWithoutLimit);
courseRouter.get("/all/paginated/:centerId", getCourses);
courseRouter.get("/inactive", getInactiveCourses);
courseRouter.get("/:id", getCourse);
courseRouter.put("/edit/:id", editCourse);
courseRouter.patch("/delete/:id", deleteCourse);
