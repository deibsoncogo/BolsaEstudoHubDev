import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { DeleteUserService } from "./deleteUserService";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      YupSetLocale();

      const schemaParams = yup.object().shape({ id: yup.string().required().uuid() });

      await schemaParams.validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const deleteUserService = container.resolve(DeleteUserService);

    return response.status(204).json(
      await deleteUserService.execute(id),
    );
  }
}
