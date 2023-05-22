import { CreateDivisionDTO, FilterDivisionClassificator } from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as classificatorController from '../controllers/classificator/classificator.controller.js';
const divisionRouter = Router();

divisionRouter.get('/', async (req: Request, res: Response) => {
	const filters: FilterDivisionClassificator = req.query;
	const results = await classificatorController.getDivisionAll(filters);
	return res.status(200).send(results);
});

divisionRouter.post('/create', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	const result = await classificatorController.DivisionCreate(payload);
	return res.status(200).send(result);
});

export default divisionRouter;
