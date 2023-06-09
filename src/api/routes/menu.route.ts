import { Request, Response, Router } from 'express';
import * as menuController from '../controllers/menu/menu.controller.js';

import passportGuard from '../../api/middleware/passport.js';
import { IMenuInput } from 'database/models/menu.js';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';
const menuRouter = Router();

const authGuard = passportGuard.authenticate('jwt', { session: false });

menuRouter.get(':/id', async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await menuController.getById(id);
	return res.status(200).send(result);
});

menuRouter.put('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const payload: IMenuInput = req.body;
	const result = await menuController.updateUser(id, payload);
	return res.status(201).send(result);
});

menuRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await menuController.deleteById(id);
	return res.status(204).send({
		success: result,
	});
});

menuRouter.post('/', async (req: Request, res: Response) => {
	const payload: IMenuInput = req.body;
	const result = await menuController.create(payload);
	return res.status(200).send(result);
});

menuRouter.get('/', authGuard, async (req: Request, res: Response) => {
	const filters: FilterDeletedDTO = req.query;
	const results = await menuController.getAll(filters);
	return res.status(200).send(results);
});

export default menuRouter;
