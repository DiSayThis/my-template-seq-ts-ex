import { User, Division } from '../models/index.js';
import { IGetAllUsersFilters } from './types.js';
import { IUserInput, IUserOutput } from '../models/user.js';
import { Op } from 'sequelize';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
	const user = await User.create(payload);
	// await Division.create({name:'УПВ НТС', shortName:'УПВ', description:'описание УПВ'});
	return user;
};

export const update = async (id: string, payload: Partial<IUserInput>): Promise<IUserOutput> => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error('not found');
	}
	const updatedUser = await (user as User).update(payload);
	return updatedUser;
};

export const getById = async (id: string): Promise<IUserOutput> => {
	const user = await User.findByPk(id);
	// console.log(user);
	if (!user) {
		throw new Error('Not found');
	}
	return user;
};

export const getOneByLogin = async (login: string): Promise<IUserOutput> => {
	const user = await User.findOne({ where: { login: login } }).catch((e) => {
		throw new Error('not found');
	});
	if (!user) {
		throw new Error('not found');
	}
	return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedUserCount = await User.destroy({
		where: { id },
	});
	return !!deletedUserCount;
};

export const getAll = async (filters?: IGetAllUsersFilters): Promise<IUserOutput[]> => {
	return User.findAll({
		where: filters?.isDeleted ? { deletedAt: { [Op.not]: null } } : {},
		paranoid: !(filters?.isDeleted || filters?.includeDeleted),
	});
};
