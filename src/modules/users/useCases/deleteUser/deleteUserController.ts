import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserService } from "./deleteUserService";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    return response.status(201).json(
      await deleteUserService.execute({ id }),
    );
  }
}
