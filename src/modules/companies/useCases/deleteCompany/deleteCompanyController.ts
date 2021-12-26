import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCompanyService } from "./deleteCompanyService";

export class DeleteCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompanyService = container.resolve(DeleteCompanyService);

    return response.status(201).json(
      await deleteCompanyService.execute(id),
    );
  }
}
