import { Schema, model, Document } from "mongoose";

export interface IStudent extends Document {
  name: { fullName: string; surname?: string };
  birthDate: Date;
  gender: "masculino" | "feminino";
  parents: { father: string; mother: string };
  address: string;
  phoneNumber: string;
  email?: string;
  status: "active" | "inactive";
  centerId: Schema.Types.ObjectId;
  endStudiedDate: Date;
  studentCode: string;
}

const studentSchema = new Schema<IStudent>({
  name: {
    fullName: { type: String, required: true },
    surname: { type: String },
  },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ["masculino", "feminino"] },
  parents: {
    father: { type: String, required: true },
    mother: { type: String, required: true },
  },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  endStudiedDate: { type: Date, default: null },
  centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
  studentCode: { type: String, required: true, unique: true },
});

// criação de índice de texto
studentSchema.index({
  "name.fullName": "text",
  studentCode: "text",
  "name.surname": "text",
});

export const StudentModel = model<IStudent>("Student", studentSchema);
