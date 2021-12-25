import { Router } from "express";
import { CreateCompanyController } from "../modules/companies/useCases/createCompany/createCompanyController";
import { FindAllCompanyController } from "../modules/companies/useCases/findAllCompany/findAllCompanyController";

const companyRoute = Router();

companyRoute.post("/", new CreateCompanyController().handle);
companyRoute.get("/all", new FindAllCompanyController().handle);

export { companyRoute };
