import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateCompanyService } from "./createCompanyService";

export class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    } = request.body;

    try {
      YupSetLocale();

      const schemaBody = yup.object().shape({
        corporateName: yup.string().required(),
        fantasyName: yup.string().required(),
        cnpj: yup.number().required().positive().integer(),
        departamento: yup.string().required(),
        contact: yup.number().required().positive().integer(),
        email: yup.string().required().email(),
        userOwnerId: yup.string().required().uuid(),
        addressId: yup.string().required().uuid(),
      });

      await schemaBody.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors, 401);
    }

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
