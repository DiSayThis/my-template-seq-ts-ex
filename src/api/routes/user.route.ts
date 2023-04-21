import { Request, Response, Router } from 'express';
import * as userController from '../controllers/user/user.controller.js';

import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from '../dto/user.dto.js';
const userRouter = Router();

userRouter.get(':/id', async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const result = await userController.getById(id);
	return res.status(200).send(result);
});

userRouter.put('/:id', async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const payload: UpdateUserDTO = req.body;
	const result = await userController.updateUser(id, payload);
	return res.status(201).send(result);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const result = await userController.deleteById(id);
	return res.status(204).send({
		success: result,
	});
});

userRouter.post('/', async (req: Request, res: Response) => {
	const payload: CreateUserDTO = req.body;
	const result = await userController.create(payload);
	return res.status(200).send(result);
});

userRouter.get('/', async (req: Request, res: Response) => {
	const filters: FilterUserDTO = req.query;
	const results = await userController.getAll(filters);
	return res.status(200).send(results);
});

export default userRouter;
