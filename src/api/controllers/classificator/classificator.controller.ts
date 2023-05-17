import { CreateDivisionDTO, FilterDivisionClassificator } from 'api/dto/classificator.dto.js';
import { IClassificatorDivision } from 'api/interfaces/classificatorDivision.interface.js';
import * as classificator from '../../../database/dal/classificator.js';

export const getDivisionAll = async (filters: FilterDivisionClassificator): Promise<IClassificatorDivision[]> => {
	return await classificator.getAllDivision(filters);
};

export const DivisionCreate = async (filters: CreateDivisionDTO): Promise<IClassificatorDivision> => {
	return await classificator.DivisionCreate(filters);
};
