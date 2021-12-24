import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateCompanyDto } from "../../dtos/iCreateCompanyDto";
import { CompanyEntity } from "../../entities/companyEntity";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class CreateCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(
    {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: ICreateCompanyDto,
  ): Promise<CompanyEntity> {
    const corporateNameAlreadyExists = await this.companyRepository.findOneCorporateName(
      corporateName,
    );

    if (corporateNameAlreadyExists) {
      throw new AppError("Já existe esta ração social cadastrada");
    }

    const cnpjAlreadyExists = await this.companyRepository.findOneCnpj(cnpj);

    if (cnpjAlreadyExists) {
      throw new AppError("Já existe este CNPJ cadastrado");
    }

    const company = await this.companyRepository.createCompany({
      corporateName,
      fantasyName,
      cnpj,
      departamento,
      contact,
      email,
      userOwnerId,
      addressId,
    });

    return company;
  }
}
