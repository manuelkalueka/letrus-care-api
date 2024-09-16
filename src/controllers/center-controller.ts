import { Request, Response } from "express";
import { CenterModel, ICenter } from "../models/center-model";

export const createCenter = async (request: Request, response: Response) => {
  const { name, address, nif, phoneNumber, email, documentCode, createdBy } =
    request.body;
  try {
    const center: ICenter = new CenterModel({
      name,
      address,
      nif,
      phoneNumber,
      email,
      documentCode,
      createdBy,
    });

    await center.save();
    response.status(201).json(center);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getCenter = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const center = await CenterModel.findById(id);
    center
      ? response.status(200).json(center)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getCenterByCreateBy = async (
  request: Request,
  response: Response
) => {
  const { createdBy } = request.params;
  try {
    const center = await CenterModel.findOne({ createdBy });
    center
      ? response.status(200).json(center)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editCenter = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, address, phoneNumber, email, documentCode } = request.body;

  try {
    const centerForUpdate = await CenterModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          address,
          phoneNumber,
          email,
          documentCode,
        },
      },
      { $upsert: true, new: true }
    );

    if (!centerForUpdate) {
      return response.status(404).json(null);
    } else {
      response.status(200).json(centerForUpdate);
    }
  } catch (error) {
    response.status(500).json(error);
  }
};
