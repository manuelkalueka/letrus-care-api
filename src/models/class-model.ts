import { Schema, model, Document } from "mongoose";

export interface IClass extends Document {
  course: Schema.Types.ObjectId;
  period: "morning" | "moon" | "evening";
  students: Schema.Types.ObjectId[];
  teachers: Schema.Types.ObjectId[];
  className: string;
  center: Schema.Types.ObjectId;
  classLimit: number;
  status: "active" | "inactive";
}

const classSchema = new Schema<IClass>({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  period: {
    type: String,
    enum: ["morning", "moon", "evening"],
    required: true,
  },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher", required: true }],
  className: { type: String, required: true, unique: true },
  center: { type: Schema.Types.ObjectId, ref: "Center", required: true },
  classLimit: { type: Number, default: 20 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const ClassModel = model<IClass>("Class", classSchema);