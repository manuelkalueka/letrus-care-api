import { Request, Response } from "express";
import { AttendanceModel, IAttendance } from "../models/attendance-model";

export const createAttendance = async (
  request: Request,
  response: Response
) => {
  const { student, classId, date, status, note }: IAttendance = request.body;
  const attendance: IAttendance = new AttendanceModel({
    student,
    classId,
    date,
    status,
    note,
  });
  try {
    await attendance.save();
    response.status(201).json(attendance);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAttendances = async (request: Request, response: Response) => {
  const { status } = request.query;
  try {
    const attendances = await AttendanceModel.find({ status }).sort({
      date: -1,
    });
    attendances
      ? response.status(200).json(attendances)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAttendance = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const attendance = await AttendanceModel.findById(id);
    attendance
      ? response.status(200).json(attendance)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editAttendance = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { date, note, isJustified }: IAttendance = request.body;
  try {
    const attendance = await AttendanceModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          date,
          note,
          isJustified,
        },
      },
      { $upsert: true, new: true }
    );
    attendance
      ? response.status(200).json(attendance)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateAttendanceStatus = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { status }: IAttendance = request.body;
  try {
    const attendance = await AttendanceModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status,
        },
      },
      { $upsert: true, new: true }
    );
    attendance
      ? response.status(200).json(attendance)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteAttendance = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  try {
    await AttendanceModel.deleteOne({ _id: id });
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
