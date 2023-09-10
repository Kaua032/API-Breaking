import { create, findAll } from '../controllers/news.controller.js'

import { Router } from "express";
const router = Router();

router.post("/", create);
router.get("/", findAll);

export default router;
