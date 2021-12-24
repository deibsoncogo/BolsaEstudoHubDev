import { container } from "tsyringe";
import { AddressRepository } from "../modules/companies/repositories/addressRepository";
import { CompanyRepository } from "../modules/companies/repositories/companyRepository";
import { IAddressRepository } from "../modules/companies/repositories/iAddressRepository";
import { ICompanyRepository } from "../modules/companies/repositories/iCompanyRepository";
import { IUserRepository } from "../modules/users/repositories/iUserRepository";
import { UserRepository } from "../modules/users/repositories/userRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IAddressRepository>("AddressRepository", AddressRepository);
container.registerSingleton<ICompanyRepository>("CompanyRepository", CompanyRepository);
