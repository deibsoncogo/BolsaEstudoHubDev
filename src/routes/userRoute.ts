import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUserController";

const userRoute = Router();

userRoute.post("/", new CreateUserController().handle);

export { userRoute };
