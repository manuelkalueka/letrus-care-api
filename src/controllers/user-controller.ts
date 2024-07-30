import { Request, Response } from "express";
import { UserModel, IUser } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (request: Request, response: Response) => {
  const { username, password, role } = request.body;
  const user: IUser = new UserModel({
    username: username.toLowerCase(),
    password,
    role,
  });
  try {
    await user.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const loginAccount = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  try {
    let user: IUser | null = await UserModel.findOne({ username });

    if (!user) {
      response.status(401).json({ error: "Verifica o username" });
    } else {
      //Verifica a senha e gera um token de 14 dias
      const same = await isCorrectPassword(password, user.password);
      if (!same) {
        response.status(401).json({ error: "Verifica a senha" });
      } else {
        //ToDo Pegar na variável de ambiente
        const secret = process.env.JWT_TOKEN;
        if (!secret) {
          return;
        }
        const token = jwt.sign(username, secret);
        response.status(200).json({ user, token });
      }
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Internal error, please try again", code: error });
  }
};

// Método assíncrono para verificar a senha correta
const isCorrectPassword = async function (
  bodyPassword: string,
  userPassword: string
): Promise<boolean> {
  try {
    const same = await bcrypt.compare(bodyPassword, userPassword);
    return same;
  } catch (err) {
    throw new Error(`Erro ao encriptar senha: ${err}`);
  }
};
