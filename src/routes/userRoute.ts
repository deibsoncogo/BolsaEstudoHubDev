import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { FindOneUserController } from "../modules/users/useCases/findOneUser/findOneUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/updateUserController";

const userRoute = Router();

userRoute.post("/", new CreateUserController().handle);
userRoute.get("/one/:id", new FindOneUserController().handle);
userRoute.put("/one/:id", new UpdateUserController().handle);

export { userRoute };
