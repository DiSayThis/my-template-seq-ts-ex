import { UrlParams } from '../../api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import { generateController } from '../../api/controllers/classificator/universal.controller.js';
import { generateExecutorWhere } from '../../utils/generateWhere.js';
import Executor, { IExecutorInput } from '../../database/models/executor.js';
const executerRouter = Router();

const controller = generateController({ generateWhere: generateExecutorWhere, model: Executor });

executerRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await controller
		.getAllCount(params)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error: Error) => res.status(403).send(error.message));

	return results;
});

executerRouter.post('/create', async (req: Request, res: Response) => {
	const payload: IExecutorInput = req.body;
	return await controller
		.create(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

executerRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.getOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

executerRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.deleteOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

executerRouter.put('/update', async (req: Request, res: Response) => {
	const payload: IExecutorInput = req.body;
	return await controller
		.update(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

export default executerRouter;
