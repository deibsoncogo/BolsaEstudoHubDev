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
    { id, name, cpf, email, passwordOld, passwordNew }: IUpdateUser,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneIdUser(id);

    if (!user) {
      throw new AppError("Não existe um usuário com este ID cadastrado", 404);
    }

    const cpfAlreadyExists = await this.userRepository.findOneCpfUser(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF cadastrado");
    }

    const emailAlreadyExists = await this.userRepository.findOneEmailUser(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este email cadastrado");
    }

    let passwordHash = null;

    if (passwordOld && passwordNew) {
      const passwordCompare = await compare(passwordOld, user.password);

      if (!passwordCompare) {
        throw new AppError("Senha antiga inválida", 401);
      }

      passwordHash = await hash(passwordNew, 8);
    }

    const userUpdate = await this.userRepository.updateUser({
      id,
      name,
      cpf,
      email,
      passwordNew: passwordHash,
    });

    delete userUpdate.password;

    return userUpdate;
  }
}
