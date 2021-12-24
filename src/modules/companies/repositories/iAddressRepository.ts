/* eslint-disable max-len */
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterAddressDto } from "../dtos/iFindFilterAddressDto";
import { IUpdateAddressDto } from "../dtos/iUpdateAddressDto";
import { AddressEntity } from "../entities/addressEntity";

export interface IAddressRepository {
  findId(id: string): Promise<AddressEntity>;
  update({ id, publicPlace, number, state, city, country }: IUpdateAddressDto): Promise<AddressEntity>;
  findFilter({ publicPlace, number, state, city, country }: IFindFilterAddressDto): Promise<AddressEntity[]>
  create({ publicPlace, number, state, city, country }: ICreateAddressDto): Promise<AddressEntity>;
}
