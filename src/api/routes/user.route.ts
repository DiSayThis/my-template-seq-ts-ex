import { Request, Response, Router } from 'express';
import * as userController from '../controllers/user/user.controller.js';

import { IUserInput } from 'database/models/user.js';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';
const userRouter = Router();

userRouter.get(':/id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await userController.getById(id);
	return res.status(200).send(result);
});

userRouter.put('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const payload: IUserInput = req.body;
	const result = await userController.updateUser(id, payload);
	return res.status(201).send(result);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await userController.deleteById(id);
	return res.status(204).send({
		success: result,
	});
});

userRouter.post('/', async (req: Request, res: Response) => {
	const payload: IUserInput = req.body;
	const result = await userController.create(payload);
	return res.status(200).send(result);
});

userRouter.get('/', async (req: Request, res: Response) => {
	const filters: FilterDeletedDTO = req.query;
	const results = await userController.getAll(filters);
	return res.status(200).send(results);
});

export default userRouter;
