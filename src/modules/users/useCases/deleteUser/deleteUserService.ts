import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class DeleteUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute(id: string): Promise<void> {
    const idExists = await this.userRepository.findOneIdUser(id);

    if (!idExists) {
      throw new AppError("Não existe um usuário com este ID cadastrado", 404);
    }

    await this.userRepository.deleteUser(id);
  }
}
