import { Router } from "express";
import {
  createGrade,
  getGrade,
  editGrade,
  deleteGrade,
  getGrades,
  getGradesWithoutLimit
} from "../controllers/grade-controller";
const gradeRouter = Router();

gradeRouter.post("/new", createGrade);
gradeRouter.get("/all/:centerId", getGradesWithoutLimit);
gradeRouter.get("/all/paginated/:centerId", getGrades);
gradeRouter.get("/:id", getGrade);
gradeRouter.put("/edit/:id", editGrade);
gradeRouter.delete("/delete/:id", deleteGrade);

export { gradeRouter };
