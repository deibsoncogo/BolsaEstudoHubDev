import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateAddressDto } from "../../dtos/iCreateAddressDto";
import { AddressEntity } from "../../entities/addressEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class CreateAddressService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(
    { publicPlace, number, state, city, country }: ICreateAddressDto,
  ): Promise<AddressEntity> {
    const addressAlreadyExists = await this.addressRepository.findFilterAddress({
      publicPlace,
      number,
      state,
      city,
      country,
    });

    if (addressAlreadyExists[0]) {
      throw new AppError("Já existe este endereço cadastrado");
    }

    const address = await this.addressRepository.createAddress({
      publicPlace,
      number,
      state,
      city,
      country,
    });

    return address;
  }
}
