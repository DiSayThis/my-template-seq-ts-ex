import { GetOneByIdType } from 'api/dto/classificator.dto.js';
import { Executor, ICountOutput } from '../../models/index.js';
import { IExecutorOutput, IExecutorInput } from 'database/models/executor.js';
import { queryCountParamsDTO } from 'api/dto/filters.dto.js';

export const getAll = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IExecutorOutput>> => {
	const { where, order } = queryParams;
	return Executor.findAndCountAll({ where, order }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const getAllCount = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IExecutorOutput>> => {
	const result = Executor.findAndCountAll(queryParams).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return result;
};

export const getCount = async (queryParams: queryCountParamsDTO): Promise<number> => {
	const { where } = queryParams;
	return Executor.count({ where }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const create = async (payload: IExecutorInput): Promise<IExecutorOutput> => {
	const result = await Executor.create(payload).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return result;
};

export const getOne = async (payload: GetOneByIdType): Promise<IExecutorOutput> => {
	const item = await Executor.findByPk(payload.id).catch((e) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (!item) {
		throw new Error('Запись не найдена');
	}
	return item;
};

export const deleteOne = async (payload: GetOneByIdType): Promise<void> => {
	await Executor.findByPk(payload.id)
		.then((result) => {
			if (!result) throw new Error('Запись не найдена');
			return result.destroy();
		})
		.catch((e) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
};

export const update = async (payload: IExecutorInput): Promise<IExecutorOutput> => {
	const item = await Executor.findByPk(payload.id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (item) {
		item.set({
			name: payload.name,
			shortName: payload.shortName,
			description: payload.description,
		});
		await item.save().catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return item;
	} else throw new Error('Ошибка: Такое подразделение не найдено!');
};
