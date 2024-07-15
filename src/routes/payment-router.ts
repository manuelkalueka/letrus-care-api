import { Router } from "express";
import {
  createPayment,
  editPayment,
  getPayment,
  getPayments,
  updatePaymentStatus,
} from "../controllers/payment-controller";
const paymentRouter = Router();

paymentRouter.get("/all", getPayments);
paymentRouter.post("/new", createPayment);
paymentRouter.get("/:id", getPayment);
paymentRouter.put("/edit/:id", editPayment);
paymentRouter.patch("/:id/status", updatePaymentStatus);

export { paymentRouter };
