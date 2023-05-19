import { CreateDivisionDTO, FilterDivisionClassificator } from 'api/dto/classificator.dto.js';
import { Request, Response, Router } from 'express';
import * as classificatorController from '../controllers/classificator/classificator.controller.js';
const classificatorRouter = Router();

classificatorRouter.get('/division', async (req: Request, res: Response) => {
	const filters: FilterDivisionClassificator = req.query;
	const results = await classificatorController.getDivisionAll(filters);
	return res.status(200).send(results);
});

classificatorRouter.post('/division/create', async (req: Request, res: Response) => {
	const payload: CreateDivisionDTO = req.body;
	const result = await classificatorController.DivisionCreate(payload);
	return res.status(200).send(result);
});

export default classificatorRouter;
