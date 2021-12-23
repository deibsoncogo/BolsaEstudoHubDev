import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/deleteUserController";
import { FindAllUserController } from "../modules/users/useCases/findAllUser/findAllUserController";
import { FindOneUserController } from "../modules/users/useCases/findOneUser/findOneUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/updateUserController";

const userRoute = Router();

userRoute.post("/", new CreateUserController().handle);
userRoute.get("/one/:id", new FindOneUserController().handle);
userRoute.get("/all", new FindAllUserController().handle);
userRoute.put("/one/:id", new UpdateUserController().handle);
userRoute.delete("/:id", new DeleteUserController().handle);

export { userRoute };
