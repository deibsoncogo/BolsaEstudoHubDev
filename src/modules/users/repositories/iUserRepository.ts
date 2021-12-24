/* eslint-disable max-len */
import { ICreateUserDto } from "../dtos/iCreateUserServiceDto";
import { IFindFilterUserDto } from "../dtos/iFindFilterUserDto";
import { IUpdateUser } from "../dtos/iUpdateUserDto";
import { UserEntity } from "../entities/userEntity";

export interface IUserRepository {
  deleteUser(id: string): Promise<void>;
  updateUser({ id, name, cpf, email, passwordOld, passwordNew }: IUpdateUser): Promise<UserEntity>,
  findOneIdUser(id: string): Promise<UserEntity>;
  findOneEmailUser(email: string): Promise<UserEntity>;
  findOneCpfUser(cpf: number): Promise<UserEntity>;
  findFilterUser({ id, name, cpf, email }: IFindFilterUserDto): Promise<UserEntity[]>;
  createUser({ name, cpf, email, password }: ICreateUserDto): Promise<UserEntity>;
}
