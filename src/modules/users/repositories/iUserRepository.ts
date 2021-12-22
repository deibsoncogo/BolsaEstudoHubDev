import { ICreateUserDto } from "../dtos/iCreateUserServiceDto";
import { UserEntity } from "../entities/userEntity";

export interface IUserRepository {
  findOneEmail(email: string): Promise<UserEntity>;
  findOneCpf(cpf: number): Promise<UserEntity>;
  create({ name, birthDate, cpf, email, password }: ICreateUserDto): Promise<UserEntity>;
}
