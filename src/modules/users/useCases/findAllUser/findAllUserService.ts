import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class FindAllUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute(): Promise<UserEntity[]> {
    const userFindAll = await this.userRepository.findAllUser();

    if (!userFindAll) {
      throw new AppError("Não existe nenhum usuário cadastrado", 200);
    }

    userFindAll.map((user) => {
      delete user.password;

      return user;
    });

    return userFindAll;
  }
}
