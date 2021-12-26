import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class DeleteCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(id: string): Promise<void> {
    await this.companyRepository.deleteCompany(id);
  }
}
