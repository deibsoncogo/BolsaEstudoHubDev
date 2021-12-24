import { Router } from "express";
import { CreateAddressController } from "../modules/companies/useCases/createAddress/CreateAddressController";
import { FindFilterController } from "../modules/companies/useCases/findFilter/findFilterController";

const addressRoute = Router();

addressRoute.post("/", new CreateAddressController().handle);
addressRoute.get("/", new FindFilterController().handle);

export { addressRoute };
