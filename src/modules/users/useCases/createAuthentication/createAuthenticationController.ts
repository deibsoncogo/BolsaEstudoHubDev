import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateAuthenticationService } from "./createAuthenticationService";

export class CreateAuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      YupSetLocale();

      const schemaBody = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
      });

      await schemaBody.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const createAuthenticationService = container.resolve(CreateAuthenticationService);

    return response.status(201).json(
      await createAuthenticationService.execute({ email, password }),
    );
  }
}
