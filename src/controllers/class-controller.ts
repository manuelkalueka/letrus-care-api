import { Request, Response } from "express";
import { ClassModel, IClass } from "../models/class-model";

export const createClass = async (request: Request, response: Response) => {
  const {
    course,
    period,
    students,
    teachers,
    className,
    center,
    classLimit,
    userId,
    schedule,
  } = request.body;

  const classInCenter: IClass = new ClassModel({
    course,
    period,
    students,
    teachers,
    className,
    center,
    classLimit,
    schedule,
    userId,
  });

  try {
    await classInCenter.save();
    response.status(201).json(classInCenter);
  } catch (error) {
    console.error("Erro ao criar turma: ", error);
    response.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getClasses = async (request: Request, response: Response) => {
  const { status } = request.query;
  const { centerId } = request.params;
  try {
    const classesInCenter = await ClassModel.find({
      status,
      center: centerId,
    }).sort({
      className: 1,
    });
    classesInCenter
      ? response.status(200).json(classesInCenter)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getClass = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const classInCenter = await ClassModel.findById(id);
    classInCenter
      ? response.status(200).json(classInCenter)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editClass = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { period, students, teachers, classLimit, schedule } = request.body;
  try {
    const classInCenter = await ClassModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          period,
          students,
          teachers,
          classLimit,
          schedule,
        },
      },
      { $upsert: true, new: true }
    );
    classInCenter
      ? response.status(200).json(classInCenter)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateClassStatus = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.body;
  //Verifica o status enviado
  if (!["active", "inactive"].includes(status)) {
    return response.status(400).json({ error: "Status inválido" });
  }

  try {
    const classInCenter = await ClassModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { $upsert: true, new: true }
    );

    if (!classInCenter) {
      return response.status(404).json({ error: "Turma não encontrada" });
    }

    response.status(200).json(classInCenter);
  } catch (error) {
    console.error("Erro ao atualizar o status da Turma:", error);
    response.status(500).json({ error: "Erro interno do servidor" });
  }
};
