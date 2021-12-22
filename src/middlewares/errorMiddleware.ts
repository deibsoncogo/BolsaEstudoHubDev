import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

// função middleware de tipo erro para lidar com eles
export async function ErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) { // se o erro foi criado pelo arquivo AppError envia estas informações
    return res.status(err.statusCode).json({ message: err.message });
  }

  // se for um erro inesperado usamos esta formatação para dar a tratativa
  return res.status(500).json({ message: `Erro interno do servidor - ${err.message}` });

  next(); // encerra o middleware
}
