import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../dtos/iCreateUserServiceDto";
import { IUpdateUser } from "../dtos/iUpdateUserDto";
import { UserEntity } from "../entities/userEntity";
import { IUserRepository } from "./iUserRepository";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
  }

  async update(
    { id, name, birthDate, cpf, email, passwordNew }: IUpdateUser,
  ): Promise<UserEntity> {
    const user = await this.findOneId(id);

    user.name = name || user.name;
    user.birthDate = birthDate || user.birthDate;
    user.cpf = cpf || user.cpf;
    user.email = email || user.email;
    user.password = passwordNew || user.password;
    user.updatedAt = new Date();

    const userSave = await this.userRepository.save(user);

    return userSave;
  }

  async findOneId(id: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ id });

    return user;
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ email });

    return user;
  }

  async findOneCpf(cpf: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ cpf });

    return user;
  }

  async create({ name, birthDate, cpf, email, password }: ICreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({ name, birthDate, cpf, email, password });

    await this.userRepository.save(user);

    return user;
  }
}
