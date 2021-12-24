import { getRepository, Repository } from "typeorm";
import { CompanyEntity } from "../entities/companyEntity";
import { ICompanyRepository } from "./iCompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  private companyRepository: Repository<CompanyEntity>;

  constructor() { this.companyRepository = getRepository(CompanyEntity); }

  async teste(): Promise<void> {
    await this.companyRepository;
  }
}
