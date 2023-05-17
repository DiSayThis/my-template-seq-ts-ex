import { FilterDivisionClassificator } from 'api/dto/classificator.dto.js';
import { IDivisionInput, IDivisionOutput } from 'database/models/divisions.js';
import { Op } from 'sequelize';
import { Division } from '../models/index.js';

export const getAllDivision = async (filters: FilterDivisionClassificator): Promise<IDivisionOutput[]> => {
	return Division.findAll({
		where: filters?.isDeleted ? { deletedAt: { [Op.not]: null } } : {},
		paranoid: !(filters?.isDeleted || filters?.includeDeleted),
	});
};

export const DivisionCreate = async (payload: IDivisionInput): Promise<IDivisionOutput> => {
	const division = await Division.create(payload);
	return division;
};
