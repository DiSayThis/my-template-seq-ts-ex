import { GetOneByIdType, UrlParams } from 'api/dto/classificator.dto.js';
import { IClassificatorTable } from 'api/interfaces/classificatorDivision.interface.js';
import * as executor from '../../../database/dal/executor.js';
import { IExecutorInput, IExecutorOutput } from 'database/models/executor.js';

export const getAll = async (params: UrlParams): Promise<IClassificatorTable<IExecutorOutput>> => {
	const data = await executor.getAll(params);
	const count = await executor.getCount(params);
	return { data, meta: { totalRowCount: count } };
};

export const getAllCount = async (params: UrlParams): Promise<IClassificatorTable<IExecutorOutput>> => {
	const data = await executor.getAllCount(params);
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
