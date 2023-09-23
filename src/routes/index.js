import { Router } from 'express';
import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import newsRouter from './news.route.js';
import swaggerRouter from './swagger.route.js';

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/doc", swaggerRouter );

export default router;