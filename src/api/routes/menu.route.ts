import { Request, Response, Router } from 'express';
import * as menuController from '../controllers/menu/menu.controller.js';

import { CreateMenuDTO, UpdateMenuDTO, FilterMenuDTO } from '../dto/menu.dto.js';
const menuRouter = Router();

menuRouter.get(':/id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await menuController.getById(id);
	return res.status(200).send(result);
});

menuRouter.put('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const payload: UpdateMenuDTO = req.body;
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
	const payload: CreateMenuDTO = req.body;
	const result = await menuController.create(payload);
	return res.status(200).send(result);
});

menuRouter.get('/', async (req: Request, res: Response) => {
	const filters: FilterMenuDTO = req.query;
	const results = await menuController.getAll(filters);
	return res.status(200).send(results);
});

export default menuRouter;
