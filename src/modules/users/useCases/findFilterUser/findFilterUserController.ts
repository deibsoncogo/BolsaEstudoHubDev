import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFilterUserService } from "./findFilterUserService";

export class FindFilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, cpf, email } = request.query;

    const findFilterUserService = container.resolve(FindFilterUserService);

    return response.status(200).json(
      await findFilterUserService.execute({
        id: id as string,
        name: name as string,
        cpf: Number(cpf as string),
        email: email as string,
      }),
    );
  }
}
