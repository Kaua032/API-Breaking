import swaggerUi from "swagger-ui-express";
import express from 'express';
const swaggerRouter = express.Router();

import swaggerDocument from "../swagger.json" assert { type: "json"};

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
