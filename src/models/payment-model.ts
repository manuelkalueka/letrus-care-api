import { Schema, model, Document } from "mongoose";

export interface IPayment extends Document {
  studentId: Schema.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  paymentMonthReference: string;
  dueDate: Date;
  status: "paid" | "pending" | "overdue";
  centerId: Schema.Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMonthReference: { type: String, required: true },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["paid", "pending", "overdue"],
    default: "pending",
  },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
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
