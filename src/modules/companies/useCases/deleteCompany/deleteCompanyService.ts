import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class DeleteCompanyService {
  constructor(@inject("CompanyRepository") private companyRepository: ICompanyRepository) { }

  async execute(id: string): Promise<void> {
    const idExists = await this.companyRepository.findIdCompany(id);

    if (!idExists) {
      throw new AppError("Não existe uma empresa com este ID cadastrado");
    }

    await this.companyRepository.deleteCompany(id);
  }
}
