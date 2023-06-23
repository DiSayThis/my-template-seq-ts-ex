import { Request, Response, Router } from 'express';
import * as controller from '../controllers/classificator/enumProduct.controller.js';
import { UrlParams } from '../../api/dto/classificator.dto.js';
import { CreationAttributes } from 'sequelize';
import Product from '../../database/models/product.js';

const productRouter = Router();

productRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await controller
		.getAllCount(params)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error: Error) => res.status(403).send(error.message));

	return results;
});

export default productRouter;
