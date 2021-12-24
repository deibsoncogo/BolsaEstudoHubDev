/* eslint-disable max-len */
import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterAddressDto } from "../dtos/iFindFilterAddressDto";
import { IUpdateAddressDto } from "../dtos/iUpdateAddressDto";
import { AddressEntity } from "../entities/addressEntity";

export interface IAddressRepository {
  findOneIdAddress(id: string): Promise<AddressEntity>;
  updateAddress({ id, publicPlace, number, state, city, country }: IUpdateAddressDto): Promise<AddressEntity>;
  findFilterAddress({ publicPlace, number, state, city, country }: IFindFilterAddressDto): Promise<AddressEntity[]>
  createAddress({ publicPlace, number, state, city, country }: ICreateAddressDto): Promise<AddressEntity>;
}
