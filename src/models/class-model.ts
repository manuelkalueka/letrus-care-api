import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface IClass extends Document {
  course: Schema.Types.UUID;
  period: "morning" | "moon" | "evening";
  grade: Schema.Types.UUID;
  students: Schema.Types.UUID[];
  teachers: Schema.Types.UUID[];
  className: string;
  center: Schema.Types.UUID;
  classLimit: number;
  status: "active" | "inactive";
  userId: Schema.Types.UUID;
  schedule: string;
}

const classSchema = new Schema<IClass>({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
  course: { type: Schema.Types.UUID, ref: "Course", required: true },
  period: {
    type: String,
    enum: ["morning", "moon", "evening"],
    required: true,
  },
  students: [{ type: Schema.Types.UUID, ref: "Student" }],
  teachers: [{ type: Schema.Types.UUID, ref: "Teacher", required: true }],
  grade: { type: Schema.Types.UUID, ref: "Grade", required: true },
  className: { type: String, required: true, unique: true },
  center: { type: Schema.Types.UUID, ref: "Center", required: true },
  classLimit: { type: Number, default: 20 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  userId: { type: Schema.Types.UUID, ref: "User", required: true },
  schedule: { type: String, required: true },
});

export const ClassModel = model<IClass>("Class", classSchema);
