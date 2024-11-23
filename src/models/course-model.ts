import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  fee: number;
  feeFine: number;
  centerId: Schema.Types.ObjectId;
  status: "active" | "inactive";
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  fee: { type: Number, required: true },
  feeFine: { type: Number, required: true },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const CourseModel = model<ICourse>("Course", courseSchema);
