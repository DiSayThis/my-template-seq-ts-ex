import { UrlParams, filtersParam, sortingParam } from 'api/dto/classificator.dto.js';
import { Op, Order, WhereOptions } from 'sequelize';

const generateWhereForTable = (params: UrlParams, columnArray: string[]) => {
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
		const fieldGlobalFilter = columnArray.map((item) => ({
			[item]: { [Op.iLike]: `%${globalFilter.replace(/\s+/g, '%')}%` },
		}));
		filterSQL = {
			[Op.and]: [
				{
					[Op.or]: fieldGlobalFilter,
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
	const where: WhereOptions = filters.length || globalFilter ? filterSQL : {};
	return { offset, limit, order, where };
};

export const generateExecutorWhere = (params: UrlParams) =>
	generateWhereForTable(params, ['name', 'shortName', 'description', 'inn']);
export const generateDivisionWhere = (params: UrlParams) =>
	generateWhereForTable(params, ['name', 'shortName', 'description']);
export const generateOrderWhere = (params: UrlParams) =>
	generateWhereForTable(params, ['number', 'endDate', 'signingDate', 'signingPerson', 'description']);
export const generateEnumProductWhere = (params: UrlParams) =>
	generateWhereForTable(params, ['number', 'name', 'description']);
