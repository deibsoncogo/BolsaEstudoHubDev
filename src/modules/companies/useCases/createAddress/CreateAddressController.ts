import { Request, Response } from "express";
import { container } from "tsyringe";
import { FirstLetterCapitalUtil } from "../../../../utils/firstLetterCapitalUtil";
import { CreateAddressService } from "./createAddressService";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicPlace, number, state, city, country } = request.body;

    const createAddressService = container.resolve(CreateAddressService);

    const publicPlaceFormatted = FirstLetterCapitalUtil(publicPlace);
    const numberFormatted = number.toUpperCase();
    const statePlaceFormatted = FirstLetterCapitalUtil(state);
    const cityPlaceFormatted = FirstLetterCapitalUtil(city);
    const countryPlaceFormatted = FirstLetterCapitalUtil(country);

    return response.status(201).json(
      await createAddressService.execute({
        publicPlace: publicPlaceFormatted,
        number: numberFormatted,
        state: statePlaceFormatted,
        city: cityPlaceFormatted,
        country: countryPlaceFormatted,
      }),
    );
  }
}
