import { CreateDivisionDTO, GetOneDivision, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorDivision, IOutDivision } from 'api/interfaces/classificatorDivision.interface.js';
import * as classificator from '../../../database/dal/classificator.js';

export const getDivisionAll = async (params: UrlParams): Promise<IClassificatorDivision> => {
	const data = await classificator.getAllDivision(params);
	const count = await classificator.getCount(params);
	return { data, meta: { totalRowCount: count } };
};

export const getDivisionAllCount = async (params: UrlParams): Promise<IClassificatorDivision> => {
	const data = await classificator.getAllCountDivision(params);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const DivisionCreate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await classificator.DivisionCreate(params);
};

export const DivisionGetOne = async (params: GetOneDivision): Promise<IOutDivision> => {
	return await classificator.DivisionGetOne(params);
};

export const DivisionUpdate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await classificator.DivisionUpdate(params);
};
