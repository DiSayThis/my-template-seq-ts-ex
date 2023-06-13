import { UrlParams } from '../../api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as controller from '../controllers/classificator/enumProduct.controller.js';
import EnumProduct from '../../database/models/enumProduct.js';
import { CreationAttributes } from 'sequelize';
const enumProductRouter = Router();

enumProductRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await controller
		.getAllCount(params)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error: Error) => res.status(403).send(error.message));

	return results;
});

enumProductRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreationAttributes<EnumProduct> = req.body;
	return await controller
		.create(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

enumProductRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.getOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

enumProductRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(403).send('Ошибка неверный id');
	} else
		return await controller
			.deleteOne(id)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(404).send(error.message));
});

enumProductRouter.put('/update', async (req: Request, res: Response) => {
	const payload: CreationAttributes<EnumProduct> = req.body;
	return await controller
		.update(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

export default enumProductRouter;
