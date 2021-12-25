import { inject, injectable } from "tsyringe";
import { CompanyEntity } from "../../entities/companyEntity";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class FindAllCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(): Promise<CompanyEntity[]> {
    const companyFindAll = await this.companyRepository.findAllCompany();

    return companyFindAll;
  }
}
