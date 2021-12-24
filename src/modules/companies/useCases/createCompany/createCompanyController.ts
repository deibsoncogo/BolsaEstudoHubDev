import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanyService } from "./createCompanyService";

export class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.body;

    const companyCreateService = container.resolve(CreateCompanyService);

    return response.status(201).json(
      await companyCreateService.execute({
        corporateName,
        fantasyName,
        cnpj,
        departamento,
        contact,
        email,
        userOwnerId,
        addressId,
      }),
    );
  }
}
