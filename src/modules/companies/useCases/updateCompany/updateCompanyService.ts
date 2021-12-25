import { inject, injectable } from "tsyringe";
import { IUpdateCompanyDto } from "../../dtos/iUpdateCompanyDto";
import { CompanyEntity } from "../../entities/companyEntity";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class UpdateCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(
    {
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: IUpdateCompanyDto,
  ): Promise<CompanyEntity> {
    const companyUpdate = await this.companyRepository.updateCompany({
      id,
      corporateName,
      fantasyName,
      cnpj,
      departamento,
      contact,
      email,
      userOwnerId,
      addressId,
    });

    return companyUpdate;
  }
}
