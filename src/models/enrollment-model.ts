import { Schema, model, Document } from "mongoose";

export interface IEnrollment extends Document {
  studentId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  enrollmentDate: Date;
  status: "enrolled" | "completed" | "dropped";
  centerId: Schema.Types.ObjectId;
  grade: Schema.Types.ObjectId | string;
  doc_file: string;
  image_file: string;
}

const enrollmentSchema = new Schema<IEnrollment>({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["enrolled", "completed", "dropped"],
    default: "enrolled",
  },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
  grade: {
    type: Schema.Types.ObjectId,
    ref: "Center",
    default: "não definido",
  },
  doc_file: { type: String },
  image_file: { type: String },
});

export const EnrollmentModel = model<IEnrollment>(
  "Enrollment",
  enrollmentSchema
);
