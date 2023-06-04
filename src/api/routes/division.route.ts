import { CreateDivisionDTO, UrlParams } from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as divisionController from '../controllers/classificator/division.controller.js';
const divisionRouter = Router();

// divisionRouter.get('/', async (req: Request, res: Response) => {
// 	const params: UrlParams = req.query;
// 	const results = await classificatorController.getDivisionAll(params);
// 	return res.status(200).send(results);
// });

divisionRouter.get('/', async (req: Request, res: Response) => {
	const params: UrlParams = req.query;
	const results = await divisionController
		.getDivisionAllCount(params)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
	return results;
});

divisionRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	return await divisionController
		.DivisionCreate(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

divisionRouter.get('/:id', async (req: Request, res: Response) => {
	const id = req.params;
	return await divisionController
		.DivisionGetOne(id)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(404).send(error.message));
});

divisionRouter.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params;
	return await divisionController
		.DivisionDeleteOne(id)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(404).send(error.message));
});

divisionRouter.put('/update', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	return await divisionController
		.DivisionUpdate(payload)
		.then((result) => res.status(200).send(result))
		.catch((error: Error) => res.status(403).send(error.message));
});

export default divisionRouter;
