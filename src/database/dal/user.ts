import { User } from '../models/index.js';
import { IGetAllUsersFilters } from './types.js';
import { IUserInput, IUserOutput } from '../models/user.js';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
	const user = await User.create(payload);
	return user;
};

export const update = async (id: number, payload: Partial<IUserInput>): Promise<IUserOutput> => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error('not found');
	}
	const updatedUser = await (user as User).update(payload);
	return updatedUser;
};

export const getById = async (id: number): Promise<IUserOutput> => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error('not found');
	}
	return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedUserCount = await User.destroy({
		where: { id },
	});
	return !!deletedUserCount;
};

export const getAll = async (filters?: IGetAllUsersFilters): Promise<IUserOutput[]> => {
	return User.findAll({
		where: { ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }) },
	});
};
