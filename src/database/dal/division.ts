import { filtersParam, sortingParam, UrlParams } from 'api/dto/classificator.dto.js';
import { IDivisionInput, IDivisionOutput } from 'database/models/divisions.js';
import { Op, Order } from 'sequelize';
import { Division, ICountOutput } from '../models/index.js';

export const getAll = async (params: UrlParams): Promise<IDivisionOutput[]> => {
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
					],
				},
				{
					...filterSQL,
				},
			],
		};
	}

	return Division.findAll({
		offset: JSON.parse(params.start || ''),
		limit: JSON.parse(params.size || ''),
		order: sortingSQL?.id && sortingSQL?.desc ? [[sortingSQL.id, sortingSQL.desc ? 'DESC' : 'ASC']] : [],
		where: filters.length || params.globalFilter ? filterSQL : {},
	});
};

export const getAllCount = async (params: UrlParams): Promise<ICountOutput<IDivisionOutput>> => {
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

	const result = Division.findAndCountAll({ offset, limit, order, where }).catch((e: Error) => {
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
					],
				},
				{
					...filterSQL,
				},
			],
		};
	}
	return Division.count({
		where: filters.length || params.globalFilter ? filterSQL : {},
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