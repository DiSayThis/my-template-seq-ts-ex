import { CreateDivisionDTO, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorTable, IOutDivision } from 'api/interfaces/classificatorDivision.interface.js';
import * as division from '../../../database/dal/division.js';
import { IDivisionOutput } from 'database/models/divisions.js';

export const getDivisionAll = async (params: UrlParams): Promise<IClassificatorTable<IDivisionOutput>> => {
	const data = await division.getAll(params);
	const count = await division.getCount(params);
	return { data, meta: { totalRowCount: count } };
};

export const getDivisionAllCount = async (params: UrlParams): Promise<IClassificatorTable<IDivisionOutput>> => {
	const data = await division.getAllCount(params);
	console.log(data);

	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const DivisionCreate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await division.create(params);
};

export const DivisionGetOne = async (id: string): Promise<IOutDivision> => {
	return await division.getOne(id);
};

export const DivisionDeleteOne = async (id: string): Promise<void> => {
	return await division.deleteOne(id);
};

export const DivisionUpdate = async (params: CreateDivisionDTO): Promise<IOutDivision> => {
	return await division.update(params);
};
