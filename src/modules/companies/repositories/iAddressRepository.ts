/* eslint-disable max-len */
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterAddressDto } from "../dtos/iFindFilterAddressDto";
import { AddressEntity } from "../entities/addressEntity";

export interface IAddressRepository {
  findFilter({ publicPlace, number, state, city, country }: IFindFilterAddressDto): Promise<AddressEntity[]>
  create({ publicPlace, number, state, city, country }: ICreateAddressDto): Promise<AddressEntity>;
}
