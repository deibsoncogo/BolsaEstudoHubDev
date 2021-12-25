import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCompanyService } from "./findAllCompanyService";

export class FindAllCompanyController {
  async handle(request: Request, response: Response) {
    const findAllCompanyService = container.resolve(FindAllCompanyService);

    return response.status(200).json(
      await findAllCompanyService.execute(),
    );
  }
}
