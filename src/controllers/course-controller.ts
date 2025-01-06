import { Request, Response } from "express";
import { CourseModel, ICourse } from "../models/course-model";

export const createCourse = async (request: Request, response: Response) => {
  const {
    name,
    description,
    startDate,
    endDate,
    fee,
    centerId,
    status,
    feeFine,
    courseType,
  }: ICourse = request.body;
  const course: ICourse = new CourseModel({
    name,
    description,
    startDate,
    endDate,
    fee,
    centerId,
    status,
    feeFine,
    courseType,
  });
  try {
    await course.save();
    response.status(201).json(course);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getCourses = async (request: Request, response: Response) => {
  try {
    const { centerId } = request.params;

    const page = parseInt(request.query.page as string) || 1;
    const limit = Number(process.env.queryLimit) as number;
    const skip = (page - 1) * limit;
    const totalCourses = await CourseModel.countDocuments({ centerId });

    const courses = await CourseModel.find({ status: "active", centerId })
      .limit(limit)
      .skip(skip)
      .sort({
        name: 1,
      });
    courses
      ? response
          .status(200)
          .json({ courses, totalCourses: Math.ceil(totalCourses / limit) })
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getInactiveCourses = async (
  request: Request,
  response: Response
) => {
  try {
    const courses = await CourseModel.find({ status: "inactive" }).sort({
      name: 1,
    });
    courses
      ? response.status(200).json(courses)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getCourse = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const course = await CourseModel.findById(id);
    course
      ? response.status(200).json(course)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editCourse = async (request: Request, response: Response) => {
  const { id } = request.params;
  const {
    name,
    description,
    startDate,
    endDate,
    fee,
    feeFine,
    courseType,
  }: ICourse = request.body;
  try {
    const course = await CourseModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          description,
          startDate,
          endDate,
          fee,
          feeFine,
          courseType,
        },
      },
      { $upsert: true, new: true }
    );
    course
      ? response.status(200).json(course)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteCourse = async (request: Request, response: Response) => {
  const { id } = request.params;
  const endDate = Date.now();
  try {
    await CourseModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "inactive", endDate } },
      { $upsert: true, new: true }
    );
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
