import { Router } from "express";
import { CreateAddressController } from "../modules/companies/useCases/createAddress/CreateAddressController";
import { FindFilterAddressController } from "../modules/companies/useCases/findFilterAddress/findFilterAddressController";
import { UpdateAddressController } from "../modules/companies/useCases/updateAddress/updateAddressController";

const addressRoute = Router();

addressRoute.post("/", new CreateAddressController().handle);
addressRoute.get("/", new FindFilterAddressController().handle);
addressRoute.put("/:id", new UpdateAddressController().handle);

export { addressRoute };
