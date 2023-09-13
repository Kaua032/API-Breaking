import { create, findAll, topNews, findById } from '../controllers/news.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

import { Router } from "express";
const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews)
router.get("/:id", findById)

export default router;
