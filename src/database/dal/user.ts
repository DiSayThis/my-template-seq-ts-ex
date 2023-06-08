import { User } from '../models/index.js';
import { IUserInput, IUserOutput } from '../models/user.js';
import { Op } from 'sequelize';
import { FilterDeletedDTO } from 'api/dto/filters.dto.js';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
	const user = await User.create(payload).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return user;
};

export const update = async (id: string, payload: Partial<IUserInput>): Promise<IUserOutput> => {
	const user = await User.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	if (!user) {
		throw new Error('not found');
	}
	const updatedUser = await user.update(payload).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return updatedUser;
};

export const getById = async (id: string): Promise<IUserOutput> => {
	const user = await User.findByPk(id).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	if (!user) {
		throw new Error('Not found');
	}
	return user;
};

export const getOneByLogin = async (login: string): Promise<IUserOutput> => {
	const user = await User.findOne({ where: { login: login } }).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	if (!user) {
		throw new Error('not found');
	}
	return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedUserCount = await User.destroy({
		where: { id },
	}).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
	return !!deletedUserCount;
};

export const getAll = async (filters?: FilterDeletedDTO): Promise<IUserOutput[]> => {
	return User.findAll({
		where: filters?.isDeleted ? { deletedAt: { [Op.not]: undefined } } : {},
		paranoid: !(filters?.isDeleted || filters?.includeDeleted),
	}).catch((e: Error) => {
		throw new Error('Ошибка: ' + e.message);
	});
};
