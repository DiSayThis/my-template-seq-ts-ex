import * as service from '../../services/menu.service.js';
import { CreateMenuDTO, UpdateMenuDTO, FilterMenuDTO } from '../../dto/menu.dto.js';
import { IMenu } from '../../interfaces/menu.interface.js';
import * as mapper from './mapper.js';

export const create = async (payload: CreateMenuDTO): Promise<IMenu> => {
	return mapper.toMenuItem(await service.create(payload));
};

export const updateUser = async (id: string, payload: UpdateMenuDTO): Promise<IMenu> => {
	return mapper.toMenuItem(await service.update(id, payload));
};

export const getById = async (id: string): Promise<IMenu> => {
	return mapper.toMenuItem(await service.getById(id));
};

export const deleteById = async (id: string): Promise<boolean> => {
	const isDeleted = await service.deleteById(id);
	return isDeleted;
};

export const getAll = async (filters: FilterMenuDTO): Promise<IMenu[]> => {
	return (await service.getAll(filters)).map(mapper.toMenuItem);
};
