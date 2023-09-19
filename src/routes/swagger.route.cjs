const swaggerUi =  require("swagger-ui-express");
const router = require("express").Router;

const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
