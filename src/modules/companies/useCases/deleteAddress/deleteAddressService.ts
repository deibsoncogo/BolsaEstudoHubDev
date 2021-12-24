import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IAddressRepository } from "../../repositories/iAddressRepository";

@injectable()
export class DeleteAddressService {
  constructor(@inject("AddressRepository") private addressRepository: IAddressRepository) { }

  async execute(id: string): Promise<void> {
    const idExists = await this.addressRepository.findOneIdAddress(id);

    if (!idExists) {
      throw new AppError("ID não cadastrado");
    }

    await this.addressRepository.deleteAddress(id);
  }
}
