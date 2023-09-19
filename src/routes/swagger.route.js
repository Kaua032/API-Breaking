import swaggerUi from "swagger-ui-express";
import { Router } from "express";
const router = Router();

import swaggerDocument from "../swagger.json" assert { type: "json" };

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
