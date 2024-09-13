import { Request, Response } from "express";
import { EnrollmentModel, IEnrollment } from "../models/enrollment-model";

export const createEnrollment = async (
  request: Request,
  response: Response
) => {
  const {
    studentId,
    courseId,
    enrollmentDate,
    status,
    centerId,
    grade,
    userId,
  }: IEnrollment = request.body;

  // // Arquivos recebidos estão disponíveis em req.files as Express.Multer.File[]
  // const docFile = request.files.doc_file[0];
  // const imageFile = request.files.image_file[0];

  const enrollment: IEnrollment = new EnrollmentModel({
    studentId,
    courseId,
    enrollmentDate,
    status,
    centerId,
    grade,
    userId,
    // docFile: docFile?.path, // Caminho do documento
    // image_file: imageFile?.path, // Caminho da imagem
  });
  try {
    await enrollment.save();
    response.status(201).json(enrollment);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const getEnrollments = async (request: Request, response: Response) => {
  try {
    const { centerId } = request.params;
    const enrollments = await EnrollmentModel.find({ centerId })
      .populate("studentId")
      .populate({ path: "courseId", select: "name" })
      .populate({ path: "grade", select: "grade" })
      .sort({
        enrollmentDate: -1,
      });
    enrollments
      ? response.status(200).json(enrollments)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getEnrollment = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const enrollment = await EnrollmentModel.findById(id)
      .populate("studentId")
      .populate({ path: "courseId", select: "name" })
      .populate({ path: "grade", select: "grade" });
    enrollment
      ? response.status(200).json(enrollment)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editEnrollment = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { studentId, courseId, enrollmentDate, status, grade }: IEnrollment =
    request.body;
  try {
    const enrollment = await EnrollmentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          studentId,
          courseId,
          enrollmentDate,
          status,
          grade,
        },
      },
      { $upsert: true, new: true }
    );
    enrollment
      ? response.status(200).json(enrollment)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteEnrollment = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  try {
    await EnrollmentModel.deleteOne({ _id: id });
    response.status(204).json({ message: "success" });
  } catch (error) {
    response.status(500).json(error);
  }
};
