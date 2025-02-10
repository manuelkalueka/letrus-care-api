import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface IEnrollment extends Document {
  studentId: Schema.Types.UUID;
  courseId: Schema.Types.UUID;
  enrollmentDate: Date;
  status: "enrolled" | "completed" | "dropped";
  centerId: Schema.Types.UUID;
  grade: Schema.Types.UUID;
  doc_file: string;
  image_file: string;
  userId: Schema.Types.UUID;
}

const enrollmentSchema = new Schema<IEnrollment>({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
  studentId: { type: Schema.Types.UUID, ref: "Student", required: true },
  courseId: { type: Schema.Types.UUID, ref: "Course", required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["enrolled", "completed", "dropped"],
    default: "enrolled",
  },
  centerId: { type: Schema.Types.UUID, ref: "Center", required: true },
  userId: { type: Schema.Types.UUID, ref: "User", required: true },
  grade: {
    type: Schema.Types.UUID,
    ref: "Grade",
    required: true,
  },
  doc_file: { type: String },
  image_file: { type: String },
});

export const EnrollmentModel = model<IEnrollment>(
  "Enrollment",
  enrollmentSchema
);
