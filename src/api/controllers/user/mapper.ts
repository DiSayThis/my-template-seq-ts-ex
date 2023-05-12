import { IUserOutput } from '../../../database/models/user.js';
import { IUser } from '../../interfaces/user.interface.js';

export const toUser = (user: IUserOutput): IUser => {
	return {
		id: user.id,
		login: user.login,
		password: user.password,
		firstName: user.firstName,
		lastName: user.lastName,
		thirdName: user.thirdName,
		phoneOS: user.phoneOS,
		phoneMGTS: user.phoneMGTS,
		isAdmin: user.isAdmin,
		position: user.position,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
		deletedAt: user.deletedAt,
	};
};
