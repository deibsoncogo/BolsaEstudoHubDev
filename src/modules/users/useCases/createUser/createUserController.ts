import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateUserService } from "./createUserService";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    try {
      YupSetLocale();

      const schemaBody = yup.object().shape({
        name: yup.string().required(),
        cpf: yup.number().required().integer().positive(),
        email: yup.string().required().email(),
        password: yup.string().required(),
      });

      await schemaBody.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

    const createUserService = container.resolve(CreateUserService);

    return response.status(201).json(
      await createUserService.execute({ name, cpf, email, password }),
    );
  }
}
