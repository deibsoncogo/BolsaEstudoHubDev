import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { DeleteAddressService } from "./deleteAddressService";

export class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      YupSetLocale();

      const schemaParams = yup.object().shape({ id: yup.string().required().uuid() });

      await schemaParams.validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const deleteAddressService = container.resolve(DeleteAddressService);

    return response.status(200).json(
      await deleteAddressService.execute(id),
    );
  }
}
