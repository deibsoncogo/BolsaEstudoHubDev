import { ICreateAddressDto } from "../dtos/iCreateAddressDto";
import { IFindFilterDto } from "../dtos/iFindFilterDto";
import { AddressEntity } from "../entities/addressEntity";

export interface IAddressRepository {
  findFilter({ publicPlace, number, state, city, country }: IFindFilterDto): Promise<AddressEntity[]>
  create({ publicPlace, number, state, city, country }: ICreateAddressDto): Promise<AddressEntity>;
}
