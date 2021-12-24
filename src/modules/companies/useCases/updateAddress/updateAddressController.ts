import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAddressService } from "./updateAddressService";

export class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { publicPlace, number, state, city, country } = request.query;

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
