/* eslint-disable max-len */
import { ICreateUserDto } from "../dtos/iCreateUserServiceDto";
import { IUpdateUser } from "../dtos/iUpdateUserDto";
import { UserEntity } from "../entities/userEntity";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  update({ id, name, cpf, email, passwordOld, passwordNew }: IUpdateUser): Promise<UserEntity>,
  findOneId(id: string): Promise<UserEntity>;
  findOneEmail(email: string): Promise<UserEntity>;
  findOneCpf(cpf: number): Promise<UserEntity>;
  create({ name, cpf, email, password }: ICreateUserDto): Promise<UserEntity>;
}
