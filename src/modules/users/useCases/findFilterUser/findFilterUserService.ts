import { inject, injectable } from "tsyringe";
import { IFindFilterUserDto } from "../../dtos/iFindFilterUserDto";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "../../repositories/iUserRepository";

@injectable()
export class FindFilterUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute(
    { id, name, cpf, email }: IFindFilterUserDto,
  ): Promise<UserEntity[]> {
    const userFindFilter = await this.userRepository.findFilterUser({ id, name, cpf, email });

    userFindFilter.map((user) => {
      delete user.password;

      return user;
    });

    return userFindFilter;
  }
}
