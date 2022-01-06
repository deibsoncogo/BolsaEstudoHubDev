import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateAuthenticationDto } from "../../dtos/iCreateAuthenticationDto";
import { IUserRepository } from "../../repositories/iUserRepository";

interface IToken {
  token: string;
}

@injectable()
export class CreateAuthenticationService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) { }

  async execute({ email, password }: ICreateAuthenticationDto): Promise<IToken> {
    const messageErro = "Email ou senha inválido";

    const user = await this.userRepository.findOneEmailUser(email);

    if (!user) {
      throw new AppError(messageErro, 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(messageErro, 401);
    }

    const token: string = sign(
      {
        nameUser: user.name,
        emailUser: user.email,
      },
      "730daedd0e1ee8bd73e09bccf201e774",
      {
        subject: user.id,
        expiresIn: "12h",
      },
    );

    return { token };
  }
}
