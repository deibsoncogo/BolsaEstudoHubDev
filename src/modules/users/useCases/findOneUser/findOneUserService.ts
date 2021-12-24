import { inject, injectable } from "tsyringe";
import { IFindOneUser } from "../../dtos/iFindOneUser";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class FindOneUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute({ id }: IFindOneUser): Promise<UserEntity> {
    const user = await this.userRepository.findOneIdUser(id);

    delete user.password;

    return user;
  }
}
