import { Request, Response, NextFunction } from "express";
const secret = process.env.JWT_TOKEN;

import jwt from "jsonwebtoken";
// import User from "../models/user";

export const withAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization; //Token esperando na requisicao
  try {
    if (!token)
      res.status(401).json({ error: "Unauthorized: no token provided" });
    else {
      if (!secret) {
        return;
      }
      // Caso o token esteja presente vamos verificar se o token passado é válido
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401).json({ error: "Unauthorized: Token Invalid!" });
        } else {
          // console.log("Sou o Decoded: ", decoded);
          // // req.username = decoded; //Altera a requisição, colocando o username do Usuário
          // const user = await User.findOne({ username: decoded }); //Procura se o usuário existe mesmo
          // // req.user = user;
          next();
        }
      });
    }
  } catch (error) {
    console.log("Erro ao verificar autenticação do usuário", error);
    res.status(500).json({ error });
  }
};
