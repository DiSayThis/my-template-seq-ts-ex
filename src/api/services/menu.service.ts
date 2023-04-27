import { IGetAllFilters } from './../../database/dal/types.js';
import * as menuDal from '../../database/dal/menu.js';
import { IMenuInput, IMenuOutput } from '../../database/models/menu.js';

export const create = (payload: IMenuInput): Promise<IMenuOutput> => {
	return menuDal.create(payload);
};
export const update = (id: string, payload: Partial<IMenuInput>): Promise<IMenuOutput> => {
	return menuDal.update(id, payload);
};
export const getById = (id: string): Promise<IMenuOutput> => {
	return menuDal.getById(id);
};
export const deleteById = (id: string): Promise<boolean> => {
	return menuDal.deleteById(id);
};
export const getAll = (filters: IGetAllFilters): Promise<IMenuOutput[]> => {
	return menuDal.getAll(filters);
};
