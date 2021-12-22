import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneUserService } from "./findOneUserService";

export class FindOneUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneUserService = container.resolve(FindOneUserService);

    return response.status(200).json(
      await findOneUserService.execute({ id }),
    );
  }
}
