import { UrlParams } from '../../../api/dto/classificator.dto.js';
import * as division from '../../../database/dal/classificator/division.dal.js';
import { IDivisionInput, IDivisionOutput } from '../../../database/models/divisions.js';
import { generateDivisionWhere } from '../../../utils/generateWhere.js';
import { IClassificatorTable } from '../../../interfaces/classificator.interface.js';

export const getAll = async (params: UrlParams): Promise<IClassificatorTable<IDivisionOutput>> => {
	const { where, order } = generateDivisionWhere(params);
	const data = await division.getAllCount({ where, order });
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const getAllCount = async (params: UrlParams): Promise<IClassificatorTable<IDivisionOutput>> => {
	const queryParams = generateDivisionWhere(params);
	const data = await division.getAllCount(queryParams);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const create = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	return await division.create(payload);
};

export const getOne = async (id: string): Promise<IDivisionOutput> => {
	return await division.getOne(id);
};

export const deleteOne = async (id: string): Promise<void> => {
	return await division.deleteOne(id);
};

export const update = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	return await division.update(payload);
};
