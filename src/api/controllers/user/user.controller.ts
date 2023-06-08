import * as dal from '../../../database/dal/user.js';
import { IUserInput, IUserOutput } from 'database/models/user.js';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
	return await dal.create(payload);
};
export const updateUser = async (id: string, payload: IUserInput): Promise<IUserOutput> => {
	return await dal.update(id, payload);
};
export const getById = async (id: string): Promise<IUserOutput> => {
	return await dal.getById(id);
};
export const getByLogin = async (login: string): Promise<IUserOutput> => {
	return await dal.getOneByLogin(login);
};
export const deleteById = async (id: string): Promise<boolean> => {
	const isDeleted = await dal.deleteById(id);
	return isDeleted;
};
export const getAll = async (filters: FilterDeletedDTO): Promise<IUserOutput[]> => {
	return await dal.getAll(filters);
};
