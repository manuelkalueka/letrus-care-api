import { Request, Response } from "express";
import { TeacherModel, ITeacher } from "../models/teacher-model";
import { createCode } from "../utils/generate-code";

export const createTeacher = async (request: Request, response: Response) => {
  const {
    fullName,
    birthDate,
    address,
    phoneNumber,
    email,
    hireDate,
    status,
    centerId,
    user,
    course,
  }: ITeacher = request.body;

  const teacherCode = await createCode(centerId, "T");
  const teacher: ITeacher = new TeacherModel({
    fullName,
    birthDate,
    address,
    phoneNumber,
    email,
    hireDate,
    status,
    centerId,
    user,
    course,
    teacherCode,
  });
  try {
    await teacher.save();
    response.status(201).json(teacher);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getTeachers = async (request: Request, response: Response) => {
  const { centerId } = request.params;
  try {
    const teachers = await TeacherModel.find({
      centerId,
    })
      .sort({
        fullName: 1,
      })
      .populate("course");
    teachers
      ? response.status(200).json(teachers)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getTeacher = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const teacher = await TeacherModel.findById(id);
    teacher
      ? response.status(200).json(teacher)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editTeacher = async (request: Request, response: Response) => {
  const { id } = request.params;
  const {
    fullName,
    birthDate,
    address,
    phoneNumber,
    email,
    hireDate,
    course,
  }: ITeacher = request.body;
  try {
    const teacher = await TeacherModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          fullName,
          birthDate,
          address,
          phoneNumber,
          email,
          hireDate,
          course,
        },
      },
      { $upsert: true, new: true }
    );
    teacher
      ? response.status(200).json(teacher)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateTeacherStatus = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.query;
  try {
    await TeacherModel.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { $upsert: true, new: true }
    );
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
