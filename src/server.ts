import "reflect-metadata";
import "./database";
import "./containers";
import express from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";
import swaggerJson from "../docs/swagger.json";
import { ErrorMiddleware } from "./middlewares/errorMiddleware";
import { indexRouter } from "./routes";

const app = express();

app.use("/doc", swagger.serve, swagger.setup(swaggerJson));
app.use(express.json());
app.use(indexRouter);
app.use(ErrorMiddleware);

app.listen(3333, () => console.log("Server is running on port 3333"));
