const swaggerUi = require("swagger-ui-express");
const express = require('express')
const router = express.Router();

const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;
