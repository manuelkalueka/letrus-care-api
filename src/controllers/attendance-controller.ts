import { Request, Response } from "express";
import { AttendanceModel, IAttendance } from "../models/attendance-model";

export const createAttendance = async (
  request: Request,
  response: Response
) => {
  const { student, classId, date, status, note, topic }: IAttendance =
    request.body;
  const attendance: IAttendance = new AttendanceModel({
    student,
    classId,
    date,
    status,
    note,
    topic,
  });
  try {
    await attendance.save();
    response.status(201).json(attendance);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAttendances = async (request: Request, response: Response) => {
  const { classId } = request.params;
  try {
    const attendances = await AttendanceModel.find({
      classId,
      status: { $ne: "absent" },
    }).sort({
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
  const { note, isJustified, topic }: IAttendance = request.body;
  try {
    const attendance = await AttendanceModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          topic,
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
