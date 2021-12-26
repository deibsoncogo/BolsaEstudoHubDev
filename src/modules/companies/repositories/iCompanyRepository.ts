/* eslint-disable max-len */
import { ICreateCompanyDto } from "../dtos/iCreateCompanyDto";
import { IFindFilterCompanyDto } from "../dtos/iFindFilterCompanyDto";
import { CompanyEntity } from "../entities/companyEntity";

export interface ICompanyRepository {
  deleteCompany(id: string): Promise<void>;
  updateCompany({ id, corporateName, fantasyName, cnpj, departamento, contact, email, userOwnerId, addressId }: IFindFilterCompanyDto): Promise<CompanyEntity>;
  findFilterCompany({ id, corporateName, fantasyName, cnpj, departamento, contact, email, userOwnerId, addressId }: IFindFilterCompanyDto): Promise<CompanyEntity[]>;
  findAllCompany(): Promise<CompanyEntity[]>;
  findOneCnpj(cnpj: number): Promise<CompanyEntity>;
  findOneCorporateName(corporateName: string): Promise<CompanyEntity>;
  createCompany({ corporateName, fantasyName, cnpj, departamento, contact, email, userOwnerId, addressId }: ICreateCompanyDto): Promise<CompanyEntity>;
}
