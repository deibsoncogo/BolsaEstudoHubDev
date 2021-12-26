import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateCompanyService } from "./updateCompanyService";

export class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.query;

    if (!corporateName && !fantasyName && !cnpj && !departamento && !contact && !email
      && !userOwnerId && !addressId) {
      throw new AppError("Não foi informado nenhum valor para alteração", 200);
    }

    try {
      YupSetLocale();

      const schemaParams = yup.object().shape({ id: yup.string().required().uuid() });

      const schemaQuery = yup.object().shape({
        corporateName: yup.string(),
        fantasyName: yup.string(),
        cnpj: yup.number().integer().positive(),
        departamento: yup.string(),
        contact: yup.number().integer().positive(),
        userOwnerId: yup.string().uuid(),
        addressId: yup.string().uuid(),
      });

      await schemaParams.validate(request.params, { abortEarly: false });
      await schemaQuery.validate(request.query, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

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
