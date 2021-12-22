import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { FindOneUserController } from "../modules/users/useCases/findOneUser/findOneUserController";

const userRoute = Router();

userRoute.post("/", new CreateUserController().handle);
userRoute.get("/one/:id", new FindOneUserController().handle);

export { userRoute };
