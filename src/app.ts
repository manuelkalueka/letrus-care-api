import express, { Application } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import "./config/database";

import { centerRouter } from "../src/routes/center-router";
import { userRouter } from "./routes/user-router";
import { withAuth } from "./middlewares/auth";
import { studentRouter } from "./routes/student-router";

const app: Application = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/centers", withAuth, centerRouter);
app.use("/users", userRouter);
app.use("/students", withAuth, studentRouter);
export default app;
