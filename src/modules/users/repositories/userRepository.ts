import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../dtos/iCreateUserServiceDto";
import { IFindFilterUserDto } from "../dtos/iFindFilterUserDto";
import { IUpdateUser } from "../dtos/iUpdateUserDto";
import { UserEntity } from "../entities/userEntity";
import { IUserRepository } from "./iUserRepository";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateUser(
    { id, name, cpf, email, passwordNew }: IUpdateUser,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });

    user.name = name || user.name;
    user.cpf = cpf || user.cpf;
    user.email = email || user.email;
    user.password = passwordNew || user.password;
    user.updatedAt = new Date();

    const userSave = await this.userRepository.save(user);

    return userSave;
  }

  async findOneIdUser(id: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ id });

    return user;
  }

  async findOneEmailUser(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ email });

    return user;
  }

  async findOneCpfUser(cpf: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ cpf });

    return user;
  }

  async findFilterUser({ id, name, cpf, email }: IFindFilterUserDto): Promise<UserEntity[]> {
    const userQueryBuilder = await this.userRepository.createQueryBuilder("user");

    id && userQueryBuilder.andWhere("user.id = :id", { id });
    name && userQueryBuilder.andWhere("user.name = :name", { name });
    cpf && userQueryBuilder.andWhere("user.cpf = :cpf", { cpf });
    email && userQueryBuilder.andWhere("user.email = :email", { email });

    const userGetMany = await userQueryBuilder.getMany();

    return userGetMany;
  }

  async createUser({ name, cpf, email, password }: ICreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({ name, cpf, email, password });

    await this.userRepository.save(user);

    return user;
  }
}
