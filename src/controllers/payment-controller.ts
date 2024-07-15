import { Request, Response } from "express";
import { PaymentModel, IPayment } from "../models/payment-model";

export const createPayment = async (request: Request, response: Response) => {
  const { studentId, amount, paymentDate, paymentMonthReference, centerId } =
    request.body;

  // Verificação dos campos obrigatórios
  if (!studentId || !amount || !paymentMonthReference || !centerId) {
    return response.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  const payment: IPayment = new PaymentModel({
    studentId,
    amount,
    paymentDate,
    paymentMonthReference,
    centerId,
  });

  try {
    await payment.save();
    response.status(201).json(payment);
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    response.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getPayments = async (request: Request, response: Response) => {
  try {
    const payments = await PaymentModel.find({}).sort({
      dueDate: -1,
    });
    payments
      ? response.status(200).json(payments)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getInactivePayments = async (
  request: Request,
  response: Response
) => {
  try {
    const Payments = await PaymentModel.find({ status: "inactive" }).sort({
      name: 1,
    });
    Payments
      ? response.status(200).json(Payments)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getPayment = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const payment = await PaymentModel.findById(id);
    payment
      ? response.status(200).json(payment)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const editPayment = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { studentId, amount, paymentDate, paymentMonthReference, centerId } =
    request.body;
  try {
    // Verificação dos campos obrigatórios
    if (!amount || !paymentMonthReference) {
      return response
        .status(400)
        .json({ error: "Campos obrigatórios faltando" });
    }
    const payment = await PaymentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          amount,
          paymentDate,
          paymentMonthReference,
        },
      },
      { $upsert: true, new: true }
    );
    payment
      ? response.status(200).json(payment)
      : response.status(404).json(null);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updatePaymentStatus = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.body;
  //Verifica o status enviado
  if (!["paid", "pending", "overdue"].includes(status)) {
    return response.status(400).json({ error: "Status inválido" });
  }

  try {
    const payment = await PaymentModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { $upsert: true, new: true }
    );

    if (!payment) {
      return response.status(404).json({ error: "Pagamento não encontrado" });
    }

    response.status(200).json(payment);
  } catch (error) {
    console.error("Erro ao atualizar o status do pagamento:", error);
    response.status(500).json({ error: "Erro interno do servidor" });
  }
};
