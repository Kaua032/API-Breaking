import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ifExistsInfoNews } from "../middlewares/global.middlewares.js";

import { Router } from "express";
const newsRouter = Router();

newsRouter.post("/", authMiddleware, ifExistsInfoNews, create);
newsRouter.get("/all", findAll);
newsRouter.get("/top", topNews);
newsRouter.get("/search", searchByTitle);
newsRouter.get("/byUser", authMiddleware, byUser);
newsRouter.get("/:id", authMiddleware, findById);
newsRouter.patch("/:id", authMiddleware, ifExistsInfoNews, update);
newsRouter.delete("/:id", authMiddleware, erase);
newsRouter.patch("/like/:id", authMiddleware, likeNews);
newsRouter.patch("/comment/:id", authMiddleware, addComment);
newsRouter.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment);

export default newsRouter;
