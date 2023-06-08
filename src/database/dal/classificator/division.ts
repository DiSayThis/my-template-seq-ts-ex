import { IDivisionInput, IDivisionOutput } from 'database/models/divisions.js';
import { Division, ICountOutput } from '../../models/index.js';
import { queryCountParamsDTO } from 'api/dto/filters.dto.js';

export const getAll = async (queryParams: queryCountParamsDTO): Promise<IDivisionOutput[]> => {
	const { where, order } = queryParams;
	return Division.findAll({ where, order }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const getAllCount = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IDivisionOutput>> => {
	return Division.findAndCountAll(queryParams).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const getCount = async (queryParams: queryCountParamsDTO): Promise<number> => {
	const { where } = queryParams;
	return Division.count({ where }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const create = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	const item = await Division.create(payload).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return item;
};

export const getOne = async (id: string): Promise<IDivisionOutput> => {
	const item = await Division.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (!item) {
		throw new Error('Запись не найдена');
	}
	return item;
};

export const deleteOne = async (id: string): Promise<void> => {
	await Division.findByPk(id)
		.then((result) => {
			if (!result) throw new Error('Запись не найдена');
			return result.destroy();
		})
		.catch((e) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
};

export const update = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	const item = await Division.findByPk(payload.id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (item) {
		item?.set({
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
