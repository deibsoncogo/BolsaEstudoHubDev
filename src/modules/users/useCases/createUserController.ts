import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./createUserService";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, birthDate, cpf, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    return response.status(201).json(
      await createUserService.execute({ name, birthDate, cpf, email, password }),
    );
  }
}
