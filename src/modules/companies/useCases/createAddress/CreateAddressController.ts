import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressService } from "./createAddressService";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicPlace, number, state, city, country } = request.body;

    const createAddressService = container.resolve(CreateAddressService);

    return response.status(201).json(
      await createAddressService.execute({ publicPlace, number, state, city, country }),
    );
  }
}
