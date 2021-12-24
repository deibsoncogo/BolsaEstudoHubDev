import { inject, injectable } from "tsyringe";
import { ICreateAddressDto } from "../../dtos/iCreateAddressDto";
import { AddressEntity } from "../../entities/addressEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class CreateAddressService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(
    { publicPlace, number, state, city, country }: ICreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.create({ publicPlace, number, state, city, country });

    return address;
  }
}
