import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { FindFilterUserService } from "./findFilterUserService";

export class FindFilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, cpf, email } = request.query;

    try {
      YupSetLocale();

      const schemaQuery = yup.object().shape({
        id: yup.string().uuid(),
        name: yup.string(),
        cpf: yup.string(),
        email: yup.string().email(),
      });

      await schemaQuery.validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const findFilterUserService = container.resolve(FindFilterUserService);

    return response.status(200).json(
      await findFilterUserService.execute({
        id: id as string,
        name: name as string,
        cpf: Number(cpf as string),
        email: email as string,
      }),
    );
  }
}
