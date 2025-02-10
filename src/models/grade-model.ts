import { Schema, model, Document } from "mongoose";

export interface IGrade extends Document {
  grade: string;
  dateRecorded: Date;
  centerId: Schema.Types.ObjectId;
}

const gradeSchema = new Schema<IGrade>({
  grade: { type: String, required: true },
  dateRecorded: { type: Date, default: Date.now },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
});

export const GradeModel = model<IGrade>("Grade", gradeSchema);
