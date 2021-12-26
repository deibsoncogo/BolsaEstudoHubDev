import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { FindFilterAddressService } from "./findFilterAddressService";

export class FindFilterAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, publicPlace, number, state, city, country } = request.query;

    try {
      YupSetLocale();

      const schemaBody = yup.object().shape({
        id: yup.string().uuid(),
        publicPlace: yup.string(),
        number: yup.string(),
        state: yup.string(),
        city: yup.string(),
        country: yup.string(),
      });

      await schemaBody.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

    const findFilterAddressService = container.resolve(FindFilterAddressService);

    return response.status(200).json(
      await findFilterAddressService.execute({
        id: id as string,
        publicPlace: publicPlace as string,
        number: number as string,
        state: state as string,
        city: city as string,
        country: country as string,
      }),
    );
  }
}
