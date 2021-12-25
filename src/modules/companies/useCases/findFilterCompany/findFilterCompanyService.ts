import { inject, injectable } from "tsyringe";
import { IFindFilterCompanyDto } from "../../dtos/iFindFilterCompanyDto";
import { CompanyEntity } from "../../entities/companyEntity";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class FindFilterCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(
    {
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: IFindFilterCompanyDto,
  ): Promise<CompanyEntity[]> {
    const companyFindFilter = await this.companyRepository.findFilterCompany(
      { id, corporateName, fantasyName, cnpj, departamento, contact, email, userOwnerId, addressId },
    );

    return companyFindFilter;
  }
}
