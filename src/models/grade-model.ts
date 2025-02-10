import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface IGrade extends Document {
  grade: string;
  dateRecorded: Date;
  centerId: Schema.Types.UUID;
}

const gradeSchema = new Schema<IGrade>({
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
  grade: { type: String, required: true },
  dateRecorded: { type: Date, default: Date.now },
  centerId: { type: Schema.Types.UUID, ref: "Center", required: true },
});

export const GradeModel = model<IGrade>("Grade", gradeSchema);
