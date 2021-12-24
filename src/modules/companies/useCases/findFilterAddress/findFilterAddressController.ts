import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFilterAddressService } from "./findFilterAddressService";

export class FindFilterAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicPlace, number, state, city, country } = request.query;

    const findFilterAddressService = container.resolve(FindFilterAddressService);

    return response.status(200).json(
      await findFilterAddressService.execute({
        publicPlace: publicPlace as string,
        number: number as string,
        state: state as string,
        city: city as string,
        country: country as string,
      }),
    );
  }
}
