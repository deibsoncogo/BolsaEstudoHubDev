import { Router } from "express";
import { CreateCompanyController } from "../modules/companies/useCases/createCompany/createCompanyController";
import { FindAllCompanyController } from "../modules/companies/useCases/findAllCompany/findAllCompanyController";
import { FindFilterCompanyController } from "../modules/companies/useCases/findFilterCompany/findFilterCompanyController";

const companyRoute = Router();

companyRoute.post("/", new CreateCompanyController().handle);
companyRoute.get("/", new FindFilterCompanyController().handle);
companyRoute.get("/all", new FindAllCompanyController().handle);

export { companyRoute };
