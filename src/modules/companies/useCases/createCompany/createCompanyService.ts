import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUserRepository } from "../../../users/repositories/iUserRepository";
import { ICreateCompanyDto } from "../../dtos/iCreateCompanyDto";
import { CompanyEntity } from "../../entities/companyEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class CreateCompanyService {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("AddressRepository")
    private addressRepository: IAddressRepository,
  ) { }

  async execute(
    {
      corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: ICreateCompanyDto,
  ): Promise<CompanyEntity> {
    const corporateNameAlreadyExists = await this.companyRepository.findOneCorporateName(
      corporateName,
    );

    if (corporateNameAlreadyExists) {
      throw new AppError("Já existe esta ração social cadastrada");
    }

    const cnpjAlreadyExists = await this.companyRepository.findOneCnpj(cnpj);

    if (cnpjAlreadyExists) {
      throw new AppError("Já existe este CNPJ cadastrado");
    }

    const userOwnerIdExists = await this.userRepository.findOneIdUser(userOwnerId);

    if (!userOwnerIdExists) {
      throw new AppError("Não existe um usuário com este ID");
    }

    const addressIdExists = await this.addressRepository.findOneIdAddress(addressId);

    if (!addressIdExists) {
      throw new AppError("Não existe um endereço com este ID");
    }

    const company = await this.companyRepository.createCompany({
      corporateName,
      fantasyName,
      cnpj,
      departamento,
      contact,
      email,
      userOwnerId,
      addressId,
    });

    return company;
  }
}
