import { Schema, model, Document } from "mongoose";

export interface IReceipt extends Document {
  receiptNumber: string;
  paymentId: Schema.Types.ObjectId;
}

const ReceiptSchema = new Schema<IReceipt>(
  {
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
      unique: true,
    },
    receiptNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const ReceiptModel = model<IReceipt>("Payment_Receipt", ReceiptSchema);
