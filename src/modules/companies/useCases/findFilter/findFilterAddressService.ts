import { inject, injectable } from "tsyringe";
import { IFindFilterAddressDto } from "../../dtos/iFindFilterAddressDto";
import { AddressEntity } from "../../entities/addressEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class FindFilterAddressService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(
    { publicPlace, number, state, city, country }: IFindFilterAddressDto,
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
