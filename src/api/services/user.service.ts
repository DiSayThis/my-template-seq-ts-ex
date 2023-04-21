import { IGetAllUsersFilters } from './../../database/dal/types.js';
import * as userDal from '../../database/dal/user.js';
import { IUserInput, IUserOutput } from '../../database/models/user.js';

export const create = (payload: IUserInput): Promise<IUserOutput> => {
	return userDal.create(payload);
};
export const update = (id: string, payload: Partial<IUserInput>): Promise<IUserOutput> => {
	return userDal.update(id, payload);
};
export const getById = (id: string): Promise<IUserOutput> => {
	return userDal.getById(id);
};
export const deleteById = (id: string): Promise<boolean> => {
	return userDal.deleteById(id);
};
export const getAll = (filters: IGetAllUsersFilters): Promise<IUserOutput[]> => {
	return userDal.getAll(filters);
};
