import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface ITeacher extends Document {
  fullName: string;
  birthDate: Date;
  address: string;
  phoneNumber: string;
  email: string;
  hireDate: Date;
  status: "active" | "inactive";
  centerId: Schema.Types.UUID;
  user: Schema.Types.UUID;
  courses: Schema.Types.UUID[];
  teacherCode: string;
}

const teacherSchema = new Schema<ITeacher>(
  {
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    fullName: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hireDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    centerId: { type: Schema.Types.UUID, ref: "Center", required: true },
    user: {
      type: Schema.Types.UUID,
      ref: "User",
      required: true,
    },
    courses: { type: [], ref: "Course", required: true },
    teacherCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const TeacherModel = model<ITeacher>("Teacher", teacherSchema);
