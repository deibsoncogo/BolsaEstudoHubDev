import { Router } from "express";
import { CreateAddressController } from "../modules/companies/useCases/createAddress/CreateAddressController";

const addressRoute = Router();

addressRoute.post("/", new CreateAddressController().handle);

export { addressRoute };
