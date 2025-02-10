import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface IPayment extends Document {
  enrollmentId: Schema.Types.UUID;
  amount: number;
  paymentDate: Date;
  paymentMonthReference: string;
  paymentYearReference: number;
  paymentMethod:
    | "Dinheiro"
    | "Multicaixa Express"
    | "Transferência Bancária (ATM)";
  dueDate: Date;
  status: "paid" | "pending" | "overdue";
  centerId: Schema.Types.UUID;
  userId: Schema.Types.UUID;
}

const paymentSchema = new Schema<IPayment>({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
  enrollmentId: {
    type: Schema.Types.UUID,
    ref: "Enrollment",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMonthReference: { type: String, required: true },
  paymentYearReference: { type: Number, required: true },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["paid", "pending", "overdue"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Dinheiro", "Multicaixa Express", "Transferência Bancária (ATM)"],
    default: "Dinheiro",
  },
  centerId: { type: Schema.Types.UUID, ref: "Center", required: true },
  userId: { type: Schema.Types.UUID, ref: "User", required: true },
});

// Hook para marcar a data de expiração do pagamento um mês após a data de pagamento
paymentSchema.pre("save", function (next) {
  const payment = this;
  try {
    if (!payment.dueDate) {
      const paymentDate = new Date(payment.paymentDate);
      payment.dueDate = new Date(
        paymentDate.setMonth(paymentDate.getMonth() + 1)
      );
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export const PaymentModel = model<IPayment>("Payment", paymentSchema);
