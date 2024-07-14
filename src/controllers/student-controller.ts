import { Request, Response } from "express";
import { StudentModel, IStudent } from "../models/student-model";

export const createStudent = async (request: Request, response: Response) => {
  const {
    name,
    birthDate,
    parents,
    address,
    phoneNumber,
    email,
    enrollmentDate,
    centerId,
  }: IStudent = request.body;
  const student: IStudent = new StudentModel({
    name,
    birthDate,
    parents,
    address,
    phoneNumber,
    email,
    enrollmentDate,
    centerId,
  });
  try {
    await student.save();
    response.status(201).json(student);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getStudents = async (request: Request, response: Response) => {
  try {
    const students = await StudentModel.find({ status: "active" }).sort({
      "name.fullName": 1,
    });
    students
      ? response.status(200).json(students)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getInactiveStudents = async (
  request: Request,
  response: Response
) => {
  try {
    const students = await StudentModel.find({ status: "inactive" }).sort({
      "name.fullName": 1,
    });
    students
      ? response.status(200).json(students)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getStudent = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const student = await StudentModel.findById(id);
    student
      ? response.status(200).json(student)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editStudent = async (request: Request, response: Response) => {
  const { id } = request.params;
  const {
    name,
    birthDate,
    parents,
    address,
    phoneNumber,
    email,
    enrollmentDate,
    centerId,
  }: IStudent = request.body;
  try {
    const student = await StudentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          birthDate,
          parents,
          address,
          phoneNumber,
          email,
          enrollmentDate,
          centerId,
        },
      },
      { $upsert: true, new: true }
    );
    student
      ? response.status(200).json(student)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteStudent = async (request: Request, response: Response) => {
  const { id } = request.params;
  const endDate = Date.now();
  try {
    await StudentModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "inactive", endDate } },
      { $upsert: true, new: true }
    );
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
