import { getRepository, Repository } from "typeorm";
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { AddressEntity } from "../entities/addressEntity";
import { IAddressRepository } from "./iAddressRepository";

export class AddressRepository implements IAddressRepository {
  private addressRepository: Repository<AddressEntity>;

  constructor() { this.addressRepository = getRepository(AddressEntity); }

  async create(
    { publicPlace, number, state, city, country }: ICreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.create({ publicPlace, number, state, city, country });

    await this.addressRepository.save(address);

    return address;
  }
}
