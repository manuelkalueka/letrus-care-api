import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

export interface ICenter extends Document {
  name: string;
  address: string;
  nif: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  documentCode: string;
  createdBy: Schema.Types.UUID;
  fileType?: String;
  fileData?: String;
}

const centerSchema = new Schema<ICenter>(
  {
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    nif: { type: String, required: true, minLength: 10, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    createdBy: {
      type: Schema.Types.UUID,
      ref: "User",
      required: true,
      unique: true,
    },
    documentCode: { type: String, required: true, unique: true },
    fileType: String,
    fileData: String,
  },
  { timestamps: true }
);

export const CenterModel = model<ICenter>("Center", centerSchema);
