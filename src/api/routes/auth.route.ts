import { Request, Response, Router } from 'express';
import { AuthUserDTO } from '../../api/dto/auth.dto.js';
import * as authController from '../controllers/auth/auth.controller.js';
import passportGuard from '../../api/middleware/passport.js';

const authRouter = Router();
const authGuard = passportGuard.authenticate('jwt', { session: false });

authRouter.post('/', async (req: Request, res: Response) => {
	const payload: AuthUserDTO = req.body;
	const result = await authController.login(payload);
	return res.status(200).send(result);
});

authRouter.get('/protected', authGuard, (req, res) => {
	res.send("i'm protected");
});

export default authRouter;

// userRouter.post('/', async (req: Request, res: Response) => {
// 	const payload: CreateUserDTO = req.body;
// 	const result = await userController.create(payload);
// 	return res.status(200).send(result);
// });
