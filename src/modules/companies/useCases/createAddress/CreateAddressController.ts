import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateAddressService } from "./createAddressService";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicPlace, number, state, city, country } = request.body;

    try {
      YupSetLocale();

      const schemaBody = yup.object().shape({
        publicPlace: yup.string().required(),
        number: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        country: yup.string().required(),
      });

      await schemaBody.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

    const createAddressService = container.resolve(CreateAddressService);

    return response.status(201).json(
      await createAddressService.execute({ publicPlace, number, state, city, country }),
    );
  }
}
