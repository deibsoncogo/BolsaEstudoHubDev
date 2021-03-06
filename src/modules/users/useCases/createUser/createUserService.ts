import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateUserDto } from "../../dtos/iCreateUserServiceDto";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class CreateUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute({ name, cpf, email, password }: ICreateUserDto): Promise<UserEntity> {
    const cpfAlreadyExists = await this.userRepository.findOneCpfUser(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF cadastrado");
    }

    const emailAlreadyExists = await this.userRepository.findOneEmailUser(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este email cadastrado");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.createUser({
      name,
      cpf,
      email,
      password: passwordHash,
    });

    delete user.password;

    return user;
  }
}
