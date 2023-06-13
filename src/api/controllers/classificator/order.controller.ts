import { UrlParams } from '../../../api/dto/classificator.dto.js';
import * as order from '../../../database/dal/classificator/order.dal.js';
import { generateOrderWhere } from '../../../utils/generateWhere.js';
import { IClassificatorTable } from '../../../interfaces/classificator.interface.js';
import { IOrderInput, IOrderOutput } from '../../../database/models/order.js';

export const getAll = async (params: UrlParams): Promise<IClassificatorTable<IOrderOutput>> => {
	const { where, order: OrderColumn } = generateOrderWhere(params);
	const data = await order.getAllCount({ where, order: OrderColumn });
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const getAllCount = async (params: UrlParams): Promise<IClassificatorTable<IOrderOutput>> => {
	const queryParams = generateOrderWhere(params);
	const data = await order.getAllCount(queryParams);
	return { data: data.rows, meta: { totalRowCount: data.count } };
};

export const create = async (payload: IOrderInput): Promise<IOrderOutput> => {
	return await order.create(payload);
};

export const getOne = async (id: string): Promise<IOrderOutput> => {
	return await order.getOne(id);
};

export const deleteOne = async (id: string): Promise<void> => {
	return await order.deleteOne(id);
};

export const update = async (payload: IOrderInput): Promise<IOrderOutput> => {
	return await order.update(payload);
};
