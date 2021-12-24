import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFilterService } from "./findFilterService";

export class FindFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { publicPlace, number, state, city, country } = request.query;

    const findFilterService = container.resolve(FindFilterService);

    return response.status(200).json(
      await findFilterService.execute({
        publicPlace: publicPlace as string,
        number: number as string,
        state: state as string,
        city: city as string,
        country: country as string,
      }),
    );
  }
}
