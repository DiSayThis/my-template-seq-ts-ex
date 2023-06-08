import { Menu } from '../models/index.js';
import { Op } from 'sequelize';
import { IMenuInput, IMenuOutput } from '../models/menu.js';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';

export const create = async (payload: IMenuInput): Promise<IMenuOutput> => {
	const menu = await Menu.create(payload).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return menu;
};

export const update = async (id: string, payload: Partial<IMenuInput>): Promise<IMenuOutput> => {
	const menu = await Menu.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	if (!menu) {
		throw new Error('not found');
	}
	const updatedMenu = await (menu as Menu).update(payload).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return updatedMenu;
};

export const getById = async (id: string): Promise<IMenuOutput> => {
	const menu = await Menu.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	if (!menu) {
		throw new Error('not found');
	}
	return menu;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedMenuCount = await Menu.destroy({
		where: { id },
	}).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return !!deletedMenuCount;
};

export const getAll = async (filters: FilterDeletedDTO): Promise<IMenuOutput[]> => {
	return Menu.findAll({
		where: filters?.isDeleted ? { deletedAt: { [Op.not]: undefined } } : {},
		paranoid: !(filters?.isDeleted || filters?.includeDeleted),
	}).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
};
