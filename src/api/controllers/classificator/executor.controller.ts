import { UrlParams } from '../../../api/dto/classificator.dto.js';
import * as executor from '../../../database/dal/classificator/executor.dal.js';
import { generateExecutorWhere } from '../../../utils/generateWhere.js';
import { IClassificatorTable } from '../../../interfaces/classificator.interface.js';
import { IExecutorInput, IExecutorOutput } from '../../../database/models/executor.js';

export const getAll = async (params: UrlParams): Promise<IClassificatorTable<IExecutorOutput>> => {
	const { where, order } = generateExecutorWhere(params);
	const data = await executor.getAllCount({ where, order });
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const getAllCount = async (params: UrlParams): Promise<IClassificatorTable<IExecutorOutput>> => {
	const queryParams = generateExecutorWhere(params);
	const data = await executor.getAllCount(queryParams);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const create = async (payload: IExecutorInput): Promise<IExecutorOutput> => {
	return await executor.create(payload);
};

export const getOne = async (id: string): Promise<IExecutorOutput> => {
	return await executor.getOne(id);
};

export const deleteOne = async (id: string): Promise<void> => {
	return await executor.deleteOne(id);
};

export const update = async (payload: IExecutorInput): Promise<IExecutorOutput> => {
	return await executor.update(payload);
};
