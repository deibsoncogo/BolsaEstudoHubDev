/* eslint-disable max-len */
import { ICreateCompanyDto } from "../dtos/iCreateCompanyDto";
import { CompanyEntity } from "../entities/companyEntity";

export interface ICompanyRepository {
  findAllCompany(): Promise<CompanyEntity[]>;
  findOneCnpj(cnpj: number): Promise<CompanyEntity>;
  findOneCorporateName(corporateName: string): Promise<CompanyEntity>;
  createCompany({ corporateName, fantasyName, cnpj, departamento, contact, email, userOwnerId, addressId }: ICreateCompanyDto): Promise<CompanyEntity>;
}
