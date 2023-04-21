import { Router } from 'express';
import { login, whoami, logout } from '../controllers/auth/auth.controller.js';
const authRouter = Router();

authRouter.post('/', login);
authRouter.get('/', whoami);
authRouter.get('/logout', logout);

export default authRouter;
