import { UrlParams } from 'api/dto/classificator.dto.js';
import * as enumProduct from '../../../database/dal/classificator/enumProduct.dal.js';
import { generateEnumProductWhere } from '../../../utils/generateWhere.js';
import { IClassificatorTable } from 'interfaces/classificator.interface.js';
import { IEnumProductInput, IEnumProductOutput } from 'database/models/enumProduct.js';

export const getAll = async (params: UrlParams): Promise<IClassificatorTable<IEnumProductOutput>> => {
	const { where, order } = generateEnumProductWhere(params);
	const data = await enumProduct.getAllCount({ where, order });
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const getAllCount = async (params: UrlParams): Promise<IClassificatorTable<IEnumProductOutput>> => {
	const queryParams = generateEnumProductWhere(params);
	const data = await enumProduct.getAllCount(queryParams);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const create = async (payload: IEnumProductInput): Promise<IEnumProductOutput> => {
	return await enumProduct.create(payload);
};

export const getOne = async (id: string): Promise<IEnumProductOutput> => {
	return await enumProduct.getOne(id);
};

export const deleteOne = async (id: string): Promise<void> => {
	return await enumProduct.deleteOne(id);
};

export const update = async (payload: IEnumProductInput): Promise<IEnumProductOutput> => {
	return await enumProduct.update(payload);
};
