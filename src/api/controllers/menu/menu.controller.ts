import * as dal from '../../../database/dal/menu.js';
import { IMenuInput, IMenuOutput } from 'database/models/menu.js';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';

export const create = async (payload: IMenuInput): Promise<IMenuOutput> => {
	return await dal.create(payload);
};

export const updateUser = async (id: string, payload: IMenuInput): Promise<IMenuOutput> => {
	return await dal.update(id, payload);
};

export const getById = async (id: string): Promise<IMenuOutput> => {
	return await dal.getById(id);
};

export const deleteById = async (id: string): Promise<boolean> => {
	const isDeleted = await dal.deleteById(id);
	return isDeleted;
};

export const getAll = async (filters: FilterDeletedDTO): Promise<IMenuOutput[]> => {
	return await dal.getAll(filters);
};
