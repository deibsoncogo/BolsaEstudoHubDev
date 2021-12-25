import { Router } from "express";
import { CreateCompanyController } from "../modules/companies/useCases/createCompany/createCompanyController";
import { FindAllCompanyController } from "../modules/companies/useCases/findAllCompany/findAllCompanyController";
import { FindFilterCompanyController } from "../modules/companies/useCases/findFilterCompany/findFilterCompanyController";
import { UpdateCompanyController } from "../modules/companies/useCases/updateCompany/updateCompanyController";

const companyRoute = Router();

companyRoute.post("/", new CreateCompanyController().handle);
companyRoute.get("/", new FindFilterCompanyController().handle);
companyRoute.get("/all", new FindAllCompanyController().handle);
companyRoute.put("/:id", new UpdateCompanyController().handle);

export { companyRoute };
