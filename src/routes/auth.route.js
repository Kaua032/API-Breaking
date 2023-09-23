import { Router } from 'express';

const authRouter = Router();

import { login } from '../controllers/auth.controller.js';

authRouter.post('/', login);

export default authRouter;