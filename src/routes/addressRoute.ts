import { Router } from "express";
import { CreateAddressController } from "../modules/companies/useCases/createAddress/CreateAddressController";
import { DeleteAddressController } from "../modules/companies/useCases/deleteAddress/deleteAddressController";
import { FindFilterAddressController } from "../modules/companies/useCases/findFilterAddress/findFilterAddressController";
import { UpdateAddressController } from "../modules/companies/useCases/updateAddress/updateAddressController";

const addressRoute = Router();

addressRoute.post("/", new CreateAddressController().handle);
addressRoute.get("/", new FindFilterAddressController().handle);
addressRoute.put("/:id", new UpdateAddressController().handle);
addressRoute.delete("/:id", new DeleteAddressController().handle);

export { addressRoute };
