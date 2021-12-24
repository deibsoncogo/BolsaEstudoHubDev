import { getRepository, Repository } from "typeorm";
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterAddressDto } from "../dtos/iFindFilterAddressDto";
import { IUpdateAddressDto } from "../dtos/iUpdateAddressDto";
import { AddressEntity } from "../entities/addressEntity";
import { IAddressRepository } from "./iAddressRepository";

export class AddressRepository implements IAddressRepository {
  private addressRepository: Repository<AddressEntity>;

  constructor() { this.addressRepository = getRepository(AddressEntity); }

  async findOneIdAddress(id: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({ id });

    return address;
  }

  async updateAddress(
    { id, publicPlace, number, state, city, country }: IUpdateAddressDto,
  ): Promise<AddressEntity> {
    const addressFindOne = await this.addressRepository.findOne({ id });

    addressFindOne.publicPlace = publicPlace || addressFindOne.publicPlace;
    addressFindOne.number = number || addressFindOne.number;
    addressFindOne.state = state || addressFindOne.state;
    addressFindOne.city = city || addressFindOne.city;
    addressFindOne.country = country || addressFindOne.country;
    addressFindOne.updatedAt = new Date();

    const addressSave = await this.addressRepository.save(addressFindOne);

    return addressSave;
  }

  async findFilterAddress(
    { publicPlace, number, state, city, country }: IFindFilterAddressDto,
  ): Promise<AddressEntity[]> {
    const addressQueryBuilder = await this.addressRepository.createQueryBuilder("address");

    publicPlace && addressQueryBuilder.andWhere("address.publicPlace = :publicPlace", { publicPlace });
    number && addressQueryBuilder.andWhere("address.number = :number", { number });
    state && addressQueryBuilder.andWhere("address.state = :state", { state });
    city && addressQueryBuilder.andWhere("address.city = :city", { city });
    country && addressQueryBuilder.andWhere("address.country = :country", { country });

    const addressGetMany = await addressQueryBuilder.getMany();

    return addressGetMany;
  }

  async createAddress(
    { publicPlace, number, state, city, country }: ICreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.create({ publicPlace, number, state, city, country });

    await this.addressRepository.save(address);

    return address;
  }
}
