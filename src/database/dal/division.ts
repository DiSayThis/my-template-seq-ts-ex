import { filtersParam, GetOneDivision, sortingParam, UrlParams } from 'api/dto/classificator.dto.js';
import { IDivisionCountOutput, IDivisionInput, IDivisionOutput } from 'database/models/divisions.js';
import { Op, Order } from 'sequelize';
import { Division } from '../models/index.js';

export const getAllDivision = async (params: UrlParams): Promise<IDivisionOutput[]> => {
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

export const getAllCountDivision = async (params: UrlParams): Promise<IDivisionCountOutput> => {
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

export const DivisionCreate = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	const division = await Division.create(payload).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	return division;
};

export const DivisionGetOne = async (payload: GetOneDivision): Promise<IDivisionOutput> => {
	const division = await Division.findByPk(payload.id).catch((e) => {
		throw new Error('Ошибка бд');
	});
	if (!division) {
		throw new Error('Запись не найдена');
	}
	return division;
};

export const DivisionDeleteOne = async (payload: GetOneDivision): Promise<void> => {
	const division = await Division.findByPk(payload.id)
		.then((result) => {
			if (!result) throw new Error('Запись не найдена');
			return result.destroy();
		})
		.catch((e) => {
			throw new Error('Ошибка бд');
		});
};

export const DivisionUpdate = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	const division = await Division.findByPk(payload.id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (division) {
		division?.set({
			name: payload.name,
			shortName: payload.shortName,
			description: payload.description,
		});
		await division.save().catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return division;
	} else throw new Error('Ошибка: Такое подразделение не найдено!');
};
