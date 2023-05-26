import {
	CreateDivisionDTO,
	FilterDivisionClassificator,
	GetOneDivision,
	UrlParams,
} from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as classificatorController from '../controllers/classificator/classificator.controller.js';
const divisionRouter = Router();

// divisionRouter.get('/', async (req: Request, res: Response) => {
// 	const params: UrlParams = req.query;
// 	const results = await classificatorController.getDivisionAll(params);
// 	return res.status(200).send(results);
// });

divisionRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await classificatorController.getDivisionAllCount(params);
	return res.status(200).send(results);
});

divisionRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	const result = await classificatorController.DivisionCreate(payload);
	return res.status(200).send(result);
});

divisionRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params;
	console.log('ds', id);
	await classificatorController
		.DivisionGetOne(id)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => res.status(404).send(error));
});

divisionRouter.put('/update', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	await classificatorController
		.DivisionUpdate(payload)
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => res.status(404).send(error));
});

export default divisionRouter;
