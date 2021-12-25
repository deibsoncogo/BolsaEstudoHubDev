import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCompanyService } from "./updateCompanyService";

export class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.query;

    const updateCompanyService = container.resolve(UpdateCompanyService);

    return response.status(201).json(
      await updateCompanyService.execute({
        id: id as string,
        corporateName: corporateName as string,
        fantasyName: fantasyName as string,
        cnpj: Number(cnpj as string),
        departamento: departamento as string,
        contact: Number(contact as string),
        email: email as string,
        userOwnerId: userOwnerId as string,
        addressId: addressId as string,
      }),
    );
  }
}
