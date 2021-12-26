import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateAddressDto } from "../../dtos/iUpdateAddressDto";
import { AddressEntity } from "../../entities/addressEntity";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class UpdateAddressService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(
    { id, publicPlace, number, state, city, country }: IUpdateAddressDto,
  ): Promise<AddressEntity> {
    const idExists = await this.addressRepository.findOneIdAddress(id);

    if (!idExists) {
      throw new AppError("Não existe este ID de endereço cadastrado");
    }

    const addressAlreadyExists = await this.addressRepository.findFilterAddress({
      publicPlace,
      number,
      state,
      city,
      country,
    });

    if (addressAlreadyExists[0]) {
      throw new AppError("Já existe este endereço no cadastrado");
    }

    const addressService = await this.addressRepository.updateAddress({
      id,
      publicPlace,
      number,
      state,
      city,
      country,
    });

    return addressService;
  }
}
