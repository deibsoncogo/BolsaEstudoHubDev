import { Router } from "express";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/deleteUserController";
import { FindFilterUserController } from "../modules/users/useCases/findFilterUser/findFilterUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/updateUserController";

const userRoute = Router();

userRoute.post("/", new CreateUserController().handle);

userRoute.use(EnsuredAuthorizedMiddleware);
userRoute.get("/", new FindFilterUserController().handle);
userRoute.put("/one/:id", new UpdateUserController().handle);
userRoute.delete("/:id", new DeleteUserController().handle);

export { userRoute };
