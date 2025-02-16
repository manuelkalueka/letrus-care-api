import { Model, Schema } from "mongoose";
import { CenterModel, ICenter } from "../models/center-model";
// Função para buscar o centro por ID
async function getCenter(
  centerId: Schema.Types.ObjectId,
  Model: Model<ICenter>
): Promise<ICenter | null> {
  try {
    const center = await Model.findById(centerId).exec();
    return center;
  } catch (error) {
    console.error("Erro ao buscar o centro:", error);
    throw new Error("Erro ao buscar o centro");
  }
}

// Função para criar o código do professor
export async function createCode(
  centerId: Schema.Types.ObjectId,
  role: string
): Promise<string> {
  try {
    const center = await getCenter(centerId, CenterModel);
    if (!center) {
      throw new Error("Centro não encontrado");
    }

    const centerCode = center.documentCode;
    const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let generatedCode = "";

    for (let i = 0; i < 2; i++) {
      generatedCode += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }

    const newCode = `${centerCode}-${role}${generatedCode}`;
    return newCode;
  } catch (error) {
    console.error("Erro ao criar código:", error);
    throw new Error("Erro ao criar código");
  }
}
