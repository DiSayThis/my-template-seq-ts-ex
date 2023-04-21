import * as service from '../../services/user.service.js';
import { CreateUserDTO, UpdateUserDTO, FilterUserDTO } from '../../dto/user.dto.js';
import { IUser } from '../../interfaces/user.interface.js';
import * as mapper from '../user/mapper.js';

export const create = async (payload: CreateUserDTO): Promise<IUser> => {
	return mapper.toUser(await service.create(payload));
};

export const updateUser = async (id: string, payload: UpdateUserDTO): Promise<IUser> => {
	return mapper.toUser(await service.update(id, payload));
};

export const getById = async (id: string): Promise<IUser> => {
	return mapper.toUser(await service.getById(id));
};

export const deleteById = async (id: string): Promise<boolean> => {
	const isDeleted = await service.deleteById(id);
	return isDeleted;
};

export const getAll = async (filters: FilterUserDTO): Promise<IUser[]> => {
	return (await service.getAll(filters)).map(mapper.toUser);
};
