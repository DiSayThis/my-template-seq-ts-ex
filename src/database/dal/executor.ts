import { filtersParam, GetOneByIdType, sortingParam, UrlParams } from 'api/dto/classificator.dto.js';
import { Op, Order } from 'sequelize';
import { Executor, ICountOutput } from '../models/index.js';
import { IExecutorOutput, IExecutorInput } from 'database/models/executor.js';

export const getAll = async (params: UrlParams): Promise<IExecutorOutput[]> => {
	const filters: filtersParam[] = JSON.parse(params.filters || '[]');
	const sortingSQL: sortingParam = JSON.parse(params.sorting || '')[0];

	let filterSQL = {};

	filters.forEach((item) => {
		filterSQL = {
			...filterSQL,
			[item.id]: { [Op.iLike]: `%${item.value.replace(/\s+/g, '%')}%` },
		};
	});

	if (params.globalFilter) {
		filterSQL = {
			[Op.and]: [
				{
					[Op.or]: [
						{ name: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ shortName: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ description: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ inn: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
					],
				},
				{
					...filterSQL,
				},
			],
		};
	}

	return Executor.findAll({
		offset: JSON.parse(params.start || ''),
		limit: JSON.parse(params.size || ''),
		order: sortingSQL?.id && sortingSQL?.desc ? [[sortingSQL.id, sortingSQL.desc ? 'DESC' : 'ASC']] : [],
		where: filters.length || params.globalFilter ? filterSQL : {},
	});
};

export const getAllCount = async (params: UrlParams): Promise<ICountOutput<IExecutorOutput>> => {
	const filters: filtersParam[] = params?.filters ? JSON.parse(params.filters || '[]') : [];
	const sortingSQL: sortingParam = params?.sorting ? JSON.parse(params.sorting || '')[0] : null;
	const globalFilter: string = params.globalFilter ?? '';

	let filterSQL = {};

	filters.forEach((item) => {
		filterSQL = {
			...filterSQL,
			[item.id]: { [Op.iLike]: `%${item.value.replace(/\s+/g, '%')}%` },
		};
	});

	if (globalFilter) {
		filterSQL = {
			[Op.and]: [
				{
					[Op.or]: [
						{ name: { [Op.iLike]: `%${globalFilter.replace(/\s+/g, '%')}%` } },
						{ shortName: { [Op.iLike]: `%${globalFilter.replace(/\s+/g, '%')}%` } },
						{ description: { [Op.iLike]: `%${globalFilter.replace(/\s+/g, '%')}%` } },
						{ inn: { [Op.iLike]: `%${globalFilter.replace(/\s+/g, '%')}%` } },
					],
				},
				{
					...filterSQL,
				},
			],
		};
	}

	const offset: number = params.start ? JSON.parse(params.start || '') : 0;
	const limit: number = params.size ? JSON.parse(params.size || '') : 30;
	const order: Order = sortingSQL && sortingSQL?.id ? [[sortingSQL.id, sortingSQL.desc ? 'DESC' : 'ASC']] : [];
	const where = filters.length || globalFilter ? filterSQL : {};

	const result = Executor.findAndCountAll({ offset, limit, order, where }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return result;
};

export const getCount = async (params: UrlParams): Promise<number> => {
	const filters: filtersParam[] = JSON.parse(params.filters || '[]');

	let filterSQL = {};

	filters.forEach((item) => {
		filterSQL = {
			...filterSQL,
			[item.id]: { [Op.iLike]: `%${item.value.replace(/\s+/g, '%')}%` },
		};
	});

	if (params.globalFilter) {
		filterSQL = {
			[Op.and]: [
				{
					[Op.or]: [
						{ name: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ shortName: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ description: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
						{ inn: { [Op.iLike]: `%${params.globalFilter.replace(/\s+/g, '%')}%` } },
					],
				},
				{
					...filterSQL,
				},
			],
		};
	}
	return Executor.count({
		where: filters.length || params.globalFilter ? filterSQL : {},
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
