import { Router } from "express";
import { addressRoute } from "./addressRoute";
import { authenticationRoute } from "./authenticationRoute";
import { companyRoute } from "./companyRoute";
import { userRoute } from "./userRoute";

const indexRouter = Router();

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"));

indexRouter.use("/user", userRoute);
indexRouter.use("/address", addressRoute);
indexRouter.use("/company", companyRoute);
indexRouter.use("/authentication", authenticationRoute);

export { indexRouter };
