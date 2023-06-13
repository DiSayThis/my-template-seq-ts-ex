import { UrlParams } from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as controller from '../controllers/classificator/executor.controller.js';
import Executor from 'database/models/executor.js';
import { CreationAttributes } from 'sequelize';
const executorRouter = Router();

executorRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await controller
		.getAllCount(params)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error: Error) => res.status(403).send(error.message));

	return results;
});

executorRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreationAttributes<Executor> = req.body;
	return await controller
		.create(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

executorRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.getOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

executorRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.deleteOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

executorRouter.put('/update', async (req: Request, res: Response) => {
	const payload: CreationAttributes<Executor> = req.body;
	return await controller
		.update(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

export default executorRouter;
