import { Router } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  editEnrollment,
  getEnrollment,
  getEnrollments,
} from "../controllers/enrollment-controller";
import { uploadDisk } from "../config/multer";

export const enrollmentRouter = Router();
const configUpload = uploadDisk.fields([
  { name: "doc_file", maxCount: 1 },
  { name: "image_file", maxCount: 1 },
]);

enrollmentRouter.post("/new", configUpload, createEnrollment);
enrollmentRouter.get("/all/:centerId", getEnrollments);
enrollmentRouter.get("/:id", getEnrollment);
enrollmentRouter.put("/edit/:id", editEnrollment);
enrollmentRouter.delete("/delete/:id", deleteEnrollment);
