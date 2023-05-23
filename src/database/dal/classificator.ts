import { filtersParam, sortingParam, UrlParams } from 'api/dto/classificator.dto.js';
import { IDivisionInput, IDivisionOutput } from 'database/models/divisions.js';
import { Op, Sequelize } from 'sequelize';
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
	const division = await Division.create(payload);
	return division;
};
