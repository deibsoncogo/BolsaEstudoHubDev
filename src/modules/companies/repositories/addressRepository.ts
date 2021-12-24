import { getRepository, Repository } from "typeorm";
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterDto } from "../dtos/iFindFilterDto";
import { AddressEntity } from "../entities/addressEntity";
import { IAddressRepository } from "./iAddressRepository";

export class AddressRepository implements IAddressRepository {
  private addressRepository: Repository<AddressEntity>;

  constructor() { this.addressRepository = getRepository(AddressEntity); }

  async findFilter(
    { publicPlace, number, state, city, country }: IFindFilterDto,
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

  async create(
    { publicPlace, number, state, city, country }: ICreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.create({ publicPlace, number, state, city, country });

    await this.addressRepository.save(address);

    return address;
  }
}
