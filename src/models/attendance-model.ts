import { Schema, model, Document } from "mongoose";

export interface IAttendance extends Document {
  student: Schema.Types.ObjectId;
  classId: Schema.Types.ObjectId;
  date: Date;
  status: "present" | "absent";
  note: string;
  isJustified: boolean;
  topic: string;
}

const attendanceSchema = new Schema<IAttendance>({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  note: String,
  isJustified: { type: Boolean },
});

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  attendanceSchema
);
