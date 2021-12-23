import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserService } from "./updateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, birthDate, cpf, email, passwordOld, passwordNew } = request.query;

    const updateUserService = container.resolve(UpdateUserService);

    return response.status(201).json(
      await updateUserService.execute({
        id: id as string,
        name: name as string,
        birthDate: new Date(birthDate as string),
        cpf: Number(cpf as string),
        email: email as string,
        passwordOld: passwordOld as string,
        passwordNew: passwordNew as string,
      }),
    );
  }
}
