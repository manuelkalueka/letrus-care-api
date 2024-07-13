import { Request, Response } from "express";
import { CenterModel, ICenter } from "../models/center-model";

export const createCenter = async (request: Request, response: Response) => {
  const { name, address, nif, phoneNumber, email, documentCode } = request.body;
  try {
    const center: ICenter = new CenterModel({
      name,
      address,
      nif,
      phoneNumber,
      email,
      documentCode,
    });

    await center.save();
    response.status(201).json(center);
  } catch (error) {
    response.status(500).json(error);
  }
};
