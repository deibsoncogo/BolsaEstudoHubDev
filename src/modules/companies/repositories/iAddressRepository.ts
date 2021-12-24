import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { AddressEntity } from "../entities/addressEntity";

export interface IAddressRepository {
  create({ publicPlace, number, state, city, country }: ICreateAddressDto): Promise<AddressEntity>;
}
