import { getRepository, Repository } from "typeorm";
import { ICreateCompanyDto } from "../dtos/iCreateCompanyDto";
import { CompanyEntity } from "../entities/companyEntity";
import { ICompanyRepository } from "./iCompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  private companyRepository: Repository<CompanyEntity>;

  constructor() { this.companyRepository = getRepository(CompanyEntity); }

  async findAllCompany(): Promise<CompanyEntity[]> {
    const companyFind = await this.companyRepository.find();

    return companyFind;
  }

  async findOneCnpj(cnpj: number): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({ cnpj });

    return company;
  }

  async findOneCorporateName(corporateName: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({ corporateName });

    return company;
  }

  async createCompany(
    {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: ICreateCompanyDto,
  ): Promise<CompanyEntity> {
    const companyCreate = await this.companyRepository.create({
      corporateName,
      fantasyName,
      cnpj,
      departamento,
      contact,
      email,
      userOwnerId,
      addressId,
    });

    await this.companyRepository.save(companyCreate);

    return companyCreate;
  }
}
