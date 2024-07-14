import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model";
const secret = process.env.JWT_TOKEN;

export const withAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization; //Token esperando na requisicao
  try {
    if (!token) {
      response.status(401).json({ error: "Unauthorized: no token provided" });
    } else {
      if (!secret) {
        return;
      }
      // Caso o token esteja presente vamos verificar se o token passado é válido
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          console.log(err);
          response.status(401).json({ error: "Unauthorized: Token Invalid!" });
        } else {
          // console.log("Usuário Autenticado ", decoded);
          const user = await UserModel.findOne({ username: decoded });
          // if (user) {
          //   request.user = user;
          // }
          // console.log("Meu Usuário: ", user);
          next();
        }
      });
    }
  } catch (error) {
    console.log("Erro ao verificar autenticação do usuário", error);
    response.status(500).json({ error });
  }
};
