import { getRepository, Repository } from "typeorm";
import { ICreateCompanyDto } from "../dtos/iCreateCompanyDto";
import { IFindFilterCompanyDto } from "../dtos/iFindFilterCompanyDto";
import { CompanyEntity } from "../entities/companyEntity";
import { ICompanyRepository } from "./iCompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  private companyRepository: Repository<CompanyEntity>;

  constructor() { this.companyRepository = getRepository(CompanyEntity); }

  async findFilterCompany(
    {
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: IFindFilterCompanyDto,
  ): Promise<CompanyEntity[]> {
    const companyCreateQueryBuilder = await this.companyRepository.createQueryBuilder("company");

    id && companyCreateQueryBuilder
      .andWhere("company.id = :id", { id });
    corporateName && companyCreateQueryBuilder
      .andWhere("company.corporateName = :corporateName", { corporateName });
    fantasyName && companyCreateQueryBuilder
      .andWhere("company.fantasyName = :fantasyName", { fantasyName });
    cnpj && companyCreateQueryBuilder
      .andWhere("company.cnpj = :cnpj", { cnpj });
    departamento && companyCreateQueryBuilder
      .andWhere("company.departamento = :departamento", { departamento });
    contact && companyCreateQueryBuilder
      .andWhere("company.contact = :contact", { contact });
    email && companyCreateQueryBuilder
      .andWhere("company.email = :email", { email });
    userOwnerId && companyCreateQueryBuilder
      .andWhere("company.userOwnerId = :userOwnerId", { userOwnerId });
    addressId && companyCreateQueryBuilder
      .andWhere("company.addressId = :addressId", { addressId });

    const companyGetMany = await companyCreateQueryBuilder.getMany();

    return companyGetMany;
  }

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
