import { UrlParams } from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as controller from '../controllers/classificator/order.controller.js';
import Order from 'database/models/order.js';
import { CreationAttributes } from 'sequelize';
const orderRouter = Router();

orderRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await controller
		.getAllCount(params)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error: Error) => res.status(403).send(error.message));

	return results;
});

orderRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreationAttributes<Order> = req.body;
	return await controller
		.create(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.getOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.deleteOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

orderRouter.put('/update', async (req: Request, res: Response) => {
	const payload: CreationAttributes<Order> = req.body;
	return await controller
		.update(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

export default orderRouter;
