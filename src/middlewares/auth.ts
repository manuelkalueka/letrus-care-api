import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model";

const secret = process.env.JWT_TOKEN;

export const withAuth: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tokenWithBearer = request.headers.authorization;

  if (!tokenWithBearer || !tokenWithBearer.startsWith("Bearer ")) {
    return response
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado" });
  }

  const token = tokenWithBearer.replace("Bearer ", "");

  if (!token) {
    return response
      .status(401)
      .json({ error: "Unauthorized: no token provided" });
  }

  if (!secret) {
    console.error("JWT secret not provided");
    return response.status(500).json({ error: "Internal Server Error" });
  }

  try {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return response
          .status(401)
          .json({ error: "Unauthorized: Token Invalid!" });
      }

      try {
        const user = await UserModel.findOne({ username: decoded });

        if (!user) {
          return response
            .status(401)
            .json({ error: "Unauthorized: User not found" });
        }
        // request.user = user;
        next();
      } catch (err) {
        console.error("Database error:", err);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Unexpected error during token verification:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
