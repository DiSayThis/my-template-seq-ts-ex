import { CreateDivisionDTO, GetOneDivision, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorDivision, IOutDivision } from 'api/interfaces/classificatorDivision.interface.js';
import * as division from '../../../database/dal/division.js';

export const getDivisionAll = async (params: UrlParams): Promise<IClassificatorDivision> => {
	const data = await division.getAllDivision(params);
	const count = await division.getCount(params);
	return { data, meta: { totalRowCount: count } };
};

export const getDivisionAllCount = async (params: UrlParams): Promise<IClassificatorDivision> => {
	const data = await division.getAllCountDivision(params);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const DivisionCreate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await division.DivisionCreate(params);
};

export const DivisionGetOne = async (params: GetOneDivision): Promise<IOutDivision> => {
	return await division.DivisionGetOne(params);
};

export const DivisionDeleteOne = async (params: GetOneDivision): Promise<void> => {
	return await division.DivisionDeleteOne(params);
};

export const DivisionUpdate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await division.DivisionUpdate(params);
};
