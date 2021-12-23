import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateUser } from "../../dtos/iUpdateUserDto";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class UpdateUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute(
    { id, name, birthDate, cpf, email, passwordOld, passwordNew }: IUpdateUser,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneId(id);

    if (!user) {
      throw new AppError("ID do usuário inválido");
    }

    const cpfAlreadyExists = await this.userRepository.findOneCpf(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF cadastrado");
    }

    const emailAlreadyExists = await this.userRepository.findOneEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este email cadastrado");
    }

    let passwordHash = null;

    if (passwordOld && passwordNew) {
      const passwordCompare = await compare(passwordOld, user.password);

      if (!passwordCompare) {
        throw new AppError("Senha antiga inválida!");
      }

      passwordHash = await hash(passwordNew, 8);
    }

    const userUpdate = await this.userRepository.update({
      id,
      name,
      birthDate,
      cpf,
      email,
      passwordNew: passwordHash,
    });

    delete userUpdate.password;

    return userUpdate;
  }
}
