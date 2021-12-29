import { Router } from "express";
import { CreateAuthenticationController } from "../modules/users/useCases/createAuthentication/createAuthenticationController";

const authenticationRoute = Router();

authenticationRoute.post("/", new CreateAuthenticationController().handle);

export { authenticationRoute };
