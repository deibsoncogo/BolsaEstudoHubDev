import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateAddressService } from "./updateAddressService";

export class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { publicPlace, number, state, city, country } = request.query;

    if (!publicPlace && !number && !state && !city && !country) {
      throw new AppError("Nenhum valor foi informado", 200);
    }

    try {
      YupSetLocale();

      const schemaParams = yup.object().shape({ id: yup.string().required().uuid() });

      const schemaQuery = yup.object().shape({
        publicPlace: yup.string(),
        number: yup.string(),
        state: yup.string(),
        city: yup.string(),
        country: yup.string(),
      });

      await schemaParams.validate(request.params, { abortEarly: true });
      await schemaQuery.validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

    const updateAddressService = container.resolve(UpdateAddressService);

    return response.status(201).json(
      await updateAddressService.execute({
        id,
        publicPlace: publicPlace as string,
        number: number as string,
        state: state as string,
        city: city as string,
        country: country as string,
      }),
    );
  }
}
