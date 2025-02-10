import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "teacher" | "student";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.UUID, default: () => randomUUID() },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "admin",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// hook para hash de senha antes de salvar
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user?.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export const UserModel = model<IUser>("User", userSchema);
