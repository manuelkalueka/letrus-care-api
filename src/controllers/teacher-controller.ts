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
    courses,
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
    courses,
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
  try {
    const { centerId } = request.params;
    const page = parseInt(request.query.page as string) || 1;
    const limit = Number(process.env.queryLimit) as number;
    const skip = (page - 1) * limit;
    const totalTeachers = await TeacherModel.countDocuments({ centerId });
    
    const teachers = await TeacherModel.find({
      centerId,
    })
      .limit(limit)
      .skip(skip)
      .sort({
        fullName: 1,
      })
      .populate("courses");
    teachers
      ? response
          .status(200)
          .json({ teachers, totalTeachers: Math.ceil(totalTeachers / limit) })
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
    courses,
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
          courses,
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
