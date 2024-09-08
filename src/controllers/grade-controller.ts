import { Request, Response } from "express";
import { GradeModel, IGrade } from "../models/grade-model";

export const createGrade = async (request: Request, response: Response) => {
  const { grade, dateRecorded, centerId }: IGrade = request.body;
  const gradeLevel: IGrade = new GradeModel({
    grade,
    dateRecorded,
    centerId,
  });
  try {
    await gradeLevel.save();
    response.status(201).json(gradeLevel);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getGrades = async (request: Request, response: Response) => {
  try {
    const { centerId } = request.params;
    const grades = await GradeModel.find({ centerId }).sort({
      grade: 1,
    });
    grades
      ? response.status(200).json(grades)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getGrade = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const grade = await GradeModel.findById(id);
    grade ? response.status(200).json(grade) : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editGrade = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { grade }: IGrade = request.body;
  try {
    const gradeLevel = await GradeModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          grade,
        },
      },
      { $upsert: true, new: true }
    );
    gradeLevel
      ? response.status(200).json(gradeLevel)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteGrade = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    await GradeModel.deleteOne({ _id: id });
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
