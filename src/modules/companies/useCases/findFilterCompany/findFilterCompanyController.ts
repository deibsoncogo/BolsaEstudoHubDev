import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { FindFilterCompanyService } from "./findFilterCompanyService";

export class FindFilterCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.query;

    try {
      YupSetLocale();

      const schemaQuery = yup.object().shape({
        id: yup.string().uuid(),
        corporateName: yup.string(),
        fantasyName: yup.string(),
        cnpj: yup.number().integer().positive(),
        departamento: yup.string(),
        contact: yup.number().integer().positive(),
        email: yup.string().email(),
        userOwnerId: yup.string().uuid(),
        addressId: yup.string().uuid(),
      });

      await schemaQuery.validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

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
