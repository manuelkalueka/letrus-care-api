import { Router } from "express";
import { upload } from "../config/multer";
import {
  createCenter,
  getCenter,
  editCenter,
  getCenterByCreateBy,
  addLogoInCenter,
} from "../controllers/center-controller";

const centerRouter = Router();

const configUpload = upload.single("logo");

centerRouter.post("/new", createCenter);
centerRouter.get("/:id", getCenter);
centerRouter.get("/user/:createdBy", getCenterByCreateBy);
centerRouter.put("/edit/:id", editCenter);
centerRouter.patch("/upload_logo/:centerId", configUpload, addLogoInCenter);

export { centerRouter };
