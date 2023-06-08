import { UrlParams } from '../../api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import { generateController } from '../../api/controllers/classificator/universal.controller.js';
import { Model, ModelStatic, CreationAttributes, OrderItem, WhereAttributeHash } from 'sequelize';

const generateRouter = <M extends Model>(
	model: ModelStatic<M>,
	generateWhere: (params: UrlParams) => {
		offset: number;
		limit: number;
		order: OrderItem[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		where: WhereAttributeHash<any>;
	},
) => {
	const router = Router();

	const controller = generateController({ generateWhere, model });

	router.get('/', async (req: Request, res: Response) => {
		const params: UrlParams = req.query;
		const results = await controller
			.getAllCount(params)
			.then((result) => {
				res.status(200).send(result);
			})
			.catch((error: Error) => res.status(403).send(error.message));

		return results;
	});
	router.post('/create', async (req: Request, res: Response) => {
		const payload: CreationAttributes<M> = req.body;
		return await controller
			.create(payload)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(403).send(error.message));
	});

	router.get('/:id', async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) {
			return res.status(403).send('Ошибка неверный id');
		} else
			return await controller
				.getOne(id)
				.then((result) => res.status(200).send(result))
				.catch((error: Error) => res.status(404).send(error.message));
	});

	router.delete('/:id', async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) {
			return res.status(403).send('Ошибка неверный id');
		} else
			return await controller
				.deleteOne(id)
				.then((result) => res.status(200).send(result))
				.catch((error: Error) => res.status(404).send(error.message));
	});

	router.put('/update', async (req: Request, res: Response) => {
		const payload: CreationAttributes<M> = req.body;
		return await controller
			.update(payload)
			.then((result) => res.status(200).send(result))
			.catch((error: Error) => res.status(403).send(error.message));
	});
	return router;
};
export default generateRouter;
