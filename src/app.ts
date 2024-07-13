import express, { Application } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import "./config/database";

import { centerRouter } from "../src/routes/center-router";
import { userRouter } from "./routes/user-router";

const app: Application = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/centers", centerRouter);
app.use("/users", userRouter);
export default app;
