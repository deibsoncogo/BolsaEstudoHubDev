import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUserService } from "./findAllUserService";

export class FindAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllUserService = container.resolve(FindAllUserService);

    return response.status(200).json(
      await findAllUserService.execute(),
    );
  }
}
