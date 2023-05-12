import { NextFunction, Request, Response, Router } from 'express';
import { AuthUserDTO } from '../../api/dto/auth.dto.js';
import * as authController from '../controllers/auth/auth.controller.js';
import passportGuard, { passportAdminGuard } from '../../api/middleware/passport.js';

const authRouter = Router();
const authGuard = passportGuard.authenticate('jwt', { session: false });
const adminGuard = passportAdminGuard.authenticate('jwt', { session: false });

authRouter.post('/login', async (req: Request, res: Response) => {
	const payload: AuthUserDTO = req.body;
	await authController
		.login(payload)
		.then((result) => {
			console.log(result);
			res.status(200).send(result);
		})
		.catch((e: Error) => {
			console.log(e);
			return res.status(401).send({ message: e.message });
		});
});

authRouter.post('/login/access-token', async (req: Request, res: Response) => {
	const payload = req.body;
	await authController
		.getNewToken(payload)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((e) => {
			console.log(e);

			res.status(401).send(e);
		});
});

authRouter.get('/protected', adminGuard, (req, res) => {
	res.send("i'm protected");
});

export default authRouter;

// userRouter.post('/', async (req: Request, res: Response) => {
// 	const payload: CreateUserDTO = req.body;
// 	const result = await userController.create(payload);
// 	return res.status(200).send(result);
// });
