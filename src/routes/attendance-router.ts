import { Router } from "express";
import {
  createAttendance,
  deleteAttendance,
  editAttendance,
  getAttendance,
  getAttendances,
} from "../controllers/attendance-controller";

export const attendanceRouter = Router();
attendanceRouter.post("/new", createAttendance);

attendanceRouter.get("/all/", getAttendances);
attendanceRouter.get("/:id", getAttendance);
attendanceRouter.put("/edit/:id", editAttendance);
attendanceRouter.delete("/delete/:id", deleteAttendance);
