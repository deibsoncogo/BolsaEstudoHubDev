import { container } from "tsyringe";
import { AddressRepository } from "../modules/companies/repositories/addressRepository";
import { IAddressRepository } from "../modules/companies/repositories/iAddressRepository";
import { IUserRepository } from "../modules/users/repositories/iUserRepository";
import { UserRepository } from "../modules/users/repositories/userRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IAddressRepository>("AddressRepository", AddressRepository);
