import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getStudent,
  getStudents,
  searchStudent,
} from "../controllers/student-controller";

export const studentRouter = Router();
studentRouter.post("/new", createStudent);

studentRouter.get("/all", getStudents);
studentRouter.get("/:id", getStudent);
studentRouter.get("/search/:centerId", searchStudent);
studentRouter.put("/edit/:id", editStudent);
studentRouter.patch("/delete/:id", deleteStudent);
