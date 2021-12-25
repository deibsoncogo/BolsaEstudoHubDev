import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFilterCompanyService } from "./findFilterCompanyService";

export class FindFilterCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.query;

    const findFilterCompanyService = container.resolve(FindFilterCompanyService);

    return response.status(200).json(
      await findFilterCompanyService.execute({
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
