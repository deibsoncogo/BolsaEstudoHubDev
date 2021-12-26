import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUserRepository } from "../../../users/repositories/iUserRepository";
import { IUpdateCompanyDto } from "../../dtos/iUpdateCompanyDto";
import { CompanyEntity } from "../../entities/companyEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";
import { ICompanyRepository } from "../../repositories/iCompanyRepository";

@injectable()
export class UpdateCompanyService {
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
      id, corporateName, fantasyName, cnpj, departamento, contact, email,
      userOwnerId, addressId,
    }: IUpdateCompanyDto,
  ): Promise<CompanyEntity> {
    const idCompanyExists = await this.companyRepository.findIdCompany(id);

    if (!idCompanyExists) {
      throw new AppError("Não existe este ID de empresa cadastrado");
    }

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

    if (userOwnerId && !userOwnerIdExists) {
      throw new AppError("Não existe um usuário com este ID");
    }

    const addressIdExists = await this.addressRepository.findOneIdAddress(addressId);

    if (addressId && !addressIdExists) {
      throw new AppError("Não existe um endereço com este ID");
    }
    const companyUpdate = await this.companyRepository.updateCompany({
      id,
      corporateName,
      fantasyName,
      cnpj,
      departamento,
      contact,
      email,
      userOwnerId,
      addressId,
    });

    return companyUpdate;
  }
}
