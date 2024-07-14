import { Schema, model, Document } from "mongoose";

export interface IStudent extends Document {
  name: { fullName: string; surname?: string };
  birthDate: Date;
  parents: { father: string; mother: string };
  address: string;
  phoneNumber: string;
  email?: string;
  enrollmentDate: Date;
  status: "active" | "inactive";
  centerId: Schema.Types.ObjectId;
  endDate: Date;
}

const studentSchema = new Schema<IStudent>({
  name: { type: Object, required: true, unique: true },
  birthDate: { type: Date, required: true },
  parents: { type: Object, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  enrollmentDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
});

export const StudentModel = model<IStudent>("Student", studentSchema);
