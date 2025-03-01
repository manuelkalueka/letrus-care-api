import { Schema, model, Document } from "mongoose";

export interface IEnrollmentReceipt extends Document {
  receiptNumber: string;
  enrollmentId: Schema.Types.ObjectId;
}

const ReceiptSchema = new Schema<IEnrollmentReceipt>(
  {
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
      unique: true,
    },
    receiptNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const ReceiptModel = model<IEnrollmentReceipt>("Enrollment_Receipt", ReceiptSchema);
