import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getInactiveStudents,
  getStudent,
  getStudents,
} from "../controllers/student-controller";

export const studentRouter = Router();
studentRouter.post("/new", createStudent);

studentRouter.get("/all", getStudents);
studentRouter.get("/inactive", getInactiveStudents);
studentRouter.get("/:id", getStudent);
studentRouter.put("/edit/:id", editStudent);
studentRouter.patch("/delete/:id", deleteStudent);
