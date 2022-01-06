import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateUserService } from "./updateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cpf, email, passwordOld, passwordNew } = request.query;

    if (!name && !cpf && !email && (!passwordOld || !passwordNew)) {
      throw new AppError("Nenhum valor foi informado", 204);
    }

    try {
      YupSetLocale();

      const schemaParams = yup.object().shape({ id: yup.string().required().uuid() });

      const schemaQuery = yup.object().shape({
        name: yup.string(),
        cpf: yup.number().integer().positive(),
        email: yup.string().email(),
        passwordOld: yup.string(),
        passwordNew: yup.string(),
      });

      await schemaParams.validate(request.params, { abortEarly: true });
      await schemaQuery.validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const updateUserService = container.resolve(UpdateUserService);

    return response.status(201).json(
      await updateUserService.execute({
        id: id as string,
        name: name as string,
        cpf: Number(cpf as string),
        email: email as string,
        passwordOld: passwordOld as string,
        passwordNew: passwordNew as string,
      }),
    );
  }
}
