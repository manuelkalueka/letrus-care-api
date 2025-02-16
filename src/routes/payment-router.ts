import { Router } from "express";
import {
  createPayment,
  editPayment,
  getPayment,
  getPayments,
  getPaymentsByStudent,
  updatePaymentStatus,
} from "../controllers/payment-controller";
const paymentRouter = Router();

paymentRouter.get("/all/:centerId", getPayments);
paymentRouter.post("/new", createPayment);
paymentRouter.get("/:id", getPayment);
paymentRouter.get("/student/:enrollmentId", getPaymentsByStudent);
paymentRouter.put("/edit/:id", editPayment);
paymentRouter.patch("/:id/status", updatePaymentStatus);

export { paymentRouter };
