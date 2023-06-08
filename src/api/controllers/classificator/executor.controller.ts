import { GetOneByIdType, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorTable } from 'interfaces/classificator.interface.js';
import * as executor from '../../../database/dal/classificator/executor.js';
import { IExecutorInput, IExecutorOutput } from 'database/models/executor.js';
import { generateExecutorWhere } from 'utils/generateWhere.js';

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

export const create = async (params: IExecutorInput): Promise<IExecutorOutput> => {
	return await executor.create(params);
};

export const getOne = async (params: GetOneByIdType): Promise<IExecutorOutput> => {
	return await executor.getOne(params);
};

export const deleteOne = async (params: GetOneByIdType): Promise<void> => {
	return await executor.deleteOne(params);
};

export const update = async (params: IExecutorInput): Promise<IExecutorOutput> => {
	return await executor.update(params);
};
