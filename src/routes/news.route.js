import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ifExistsInfoNews } from "../middlewares/global.middlewares.js";

import { Router } from "express";
const router = Router();

router.post("/", authMiddleware, ifExistsInfoNews, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, ifExistsInfoNews, update)
export default router;
