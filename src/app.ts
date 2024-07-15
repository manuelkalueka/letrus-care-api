import express, { Application } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import "./config/database";

import { centerRouter } from "../src/routes/center-router";
import { userRouter } from "./routes/user-router";
import { withAuth } from "./middlewares/auth";
import { studentRouter } from "./routes/student-router";
import { courseRouter } from "./routes/course-router";
import { enrollmentRouter } from "./routes/enrollment-route";
import { gradeRouter } from "./routes/grade-router";
import { paymentRouter } from "./routes/payment-router";
import { classRouter } from "./routes/class-router";
import { teacherRouter } from "./routes/teacher-router";

const app: Application = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/centers", withAuth, centerRouter);
app.use("/users", userRouter);
app.use("/students", withAuth, studentRouter);
app.use("/courses", withAuth, courseRouter);
app.use("/enrollments", withAuth, enrollmentRouter);
app.use("/grades", withAuth, gradeRouter);
app.use("/payments", withAuth, paymentRouter);
app.use("/classes", withAuth, classRouter);
app.use("/teachers", withAuth, teacherRouter)
export default app;
