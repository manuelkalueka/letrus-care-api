import { Router } from "express";
import {
  createAttendance,
  editAttendance,
  getAttendance,
  getAttendances,
  updateAttendanceStatus,
} from "../controllers/attendance-controller";

export const attendanceRouter = Router();
attendanceRouter.post("/new", createAttendance);

attendanceRouter.get("/all/", getAttendances);
attendanceRouter.get("/:id", getAttendance);
attendanceRouter.put("/edit/:id", editAttendance);
attendanceRouter.patch("/status/:id", updateAttendanceStatus);
