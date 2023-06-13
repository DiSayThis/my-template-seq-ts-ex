import { Order, ICountOutput } from '../../models/index.js';
import { IOrderOutput, IOrderInput } from 'database/models/order.js';
import { queryCountParamsDTO } from 'api/dto/filters.dto.js';

export const getAll = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IOrderOutput>> => {
	const { where, order } = queryParams;
	return Order.findAndCountAll({ where, order }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const getAllCount = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IOrderOutput>> => {
	const result = Order.findAndCountAll(queryParams).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return result;
};

export const getCount = async (queryParams: queryCountParamsDTO): Promise<number> => {
	const { where } = queryParams;
	return Order.count({ where }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const create = async (payload: IOrderInput): Promise<IOrderOutput> => {
	const result = await Order.create(payload).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return result;
};

export const getOne = async (id: string): Promise<IOrderOutput> => {
	const item = await Order.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (!item) {
		throw new Error('Запись не найдена');
	}
	return item;
};

export const deleteOne = async (id: string): Promise<void> => {
	await Order.findByPk(id)
		.then((result) => {
			if (!result) throw new Error('Запись не найдена');
			return result.destroy();
		})
		.catch((e) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
};

export const update = async (payload: IOrderInput): Promise<IOrderOutput> => {
	const item = await Order.findByPk(payload.id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (item) {
		item.set(payload);
		await item.save().catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return item;
	} else throw new Error('Ошибка: Такое подразделение не найдено!');
};
