/* eslint-disable function-paren-newline */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";

interface IToken {
  name: string;
  sub: string;
  nameUser: string;
  emailUser: string;
}

export async function EnsuredAuthorizedMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 404);
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenVerify = verify(token, "730daedd0e1ee8bd73e09bccf201e774") as IToken;

    request.userId = tokenVerify.sub;
    request.userName = tokenVerify.nameUser;
    request.userEmail = tokenVerify.emailUser;

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}
