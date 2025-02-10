import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface IAttendance extends Document {
  student: Schema.Types.UUID;
  classId: Schema.Types.UUID;
  date: Date;
  status: "present" | "absent";
  note: string;
  isJustified: boolean;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    student: { type: Schema.Types.UUID, ref: "Student", required: true },
    classId: { type: Schema.Types.UUID, ref: "Class", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], required: true },
    note: String,
    isJustified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  attendanceSchema
);
