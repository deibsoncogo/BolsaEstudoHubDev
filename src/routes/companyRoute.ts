import { Router } from "express";
import { CreateCompanyController } from "../modules/companies/useCases/createCompany/createCompanyController";

const companyRoute = Router();

companyRoute.post("/", new CreateCompanyController().handle);

export { companyRoute };
