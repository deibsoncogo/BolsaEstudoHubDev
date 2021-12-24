import { inject, injectable } from "tsyringe";
import { IFindFilterDto } from "../../dtos/iFindFilterDto";
import { AddressEntity } from "../../entities/addressEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class FindFilterService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(
    { publicPlace, number, state, city, country }: IFindFilterDto,
  ): Promise<AddressEntity[]> {
    const address = await this.addressRepository.findFilter({
      publicPlace,
      number,
      state,
      city,
      country,
    });

    return address;
  }
}
