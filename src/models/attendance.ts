import { Schema, model, Document } from "mongoose";

export interface IAttendance extends Document {
  student: Schema.Types.ObjectId;
  class: Schema.Types.ObjectId;
  date: Date;
  status: "present" | "absent";
}

const attendanceSchema = new Schema<IAttendance>({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
});

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  attendanceSchema
);
