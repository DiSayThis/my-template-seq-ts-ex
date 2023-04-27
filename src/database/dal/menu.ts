import { Menu } from '../models/index.js';
import { Op } from 'sequelize';
import { IMenuInput, IMenuOutput } from '../models/menu.js';
import { IGetAllFilters } from './types.js';

export const create = async (payload: IMenuInput): Promise<IMenuOutput> => {
	const menu = await Menu.create(payload);
	return menu;
};

export const update = async (id: string, payload: Partial<IMenuInput>): Promise<IMenuOutput> => {
	const menu = await Menu.findByPk(id);
	if (!menu) {
		throw new Error('not found');
	}
	const updatedMenu = await (menu as Menu).update(payload);
	return updatedMenu;
};

export const getById = async (id: string): Promise<IMenuOutput> => {
	const menu = await Menu.findByPk(id);
	if (!menu) {
		throw new Error('not found');
	}
	return menu;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedMenuCount = await Menu.destroy({
		where: { id },
	});
	return !!deletedMenuCount;
};

export const getAll = async (filters: IGetAllFilters): Promise<IMenuOutput[]> => {
	return Menu.findAll({
		where: filters?.isDeleted ? { deletedAt: { [Op.not]: null } } : {},
		paranoid: !(filters?.isDeleted || filters?.includeDeleted),
	});
};
