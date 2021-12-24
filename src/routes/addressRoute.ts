import { Router } from "express";
import { CreateAddressController } from "../modules/companies/useCases/createAddress/CreateAddressController";
import { FindFilterAddressController } from "../modules/companies/useCases/findFilter/findFilterAddressController";

const addressRoute = Router();

addressRoute.post("/", new CreateAddressController().handle);
addressRoute.get("/", new FindFilterAddressController().handle);

export { addressRoute };
