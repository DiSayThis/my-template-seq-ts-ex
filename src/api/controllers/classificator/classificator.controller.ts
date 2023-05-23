import { CreateDivisionDTO, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorDivision, IOutDivision } from 'api/interfaces/classificatorDivision.interface.js';
import * as classificator from '../../../database/dal/classificator.js';

export const getDivisionAll = async (params: UrlParams): Promise<IClassificatorDivision> => {
	console.log(params);
	const data = await classificator.getAllDivision(params);
	const count = await classificator.getCount(params);
	return { data, meta: { totalRowCount: count } };
};

export const DivisionCreate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await classificator.DivisionCreate(params);
};
