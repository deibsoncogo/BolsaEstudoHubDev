import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAddressService } from "./deleteAddressService";

export class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddressService = container.resolve(DeleteAddressService);

    return response.status(200).json(
      await deleteAddressService.execute(id),
    );
  }
}
