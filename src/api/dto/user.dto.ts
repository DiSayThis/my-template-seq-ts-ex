import { Optional } from 'sequelize';

export type CreateUserDTO = {
	login: string;
	password: string;
	firstName: string;
	lastName: string;
	thirdName?: string;
	phoneOS?: string;
	phoneMGTS?: string;
	position?: string;
	isAdmin?: boolean;
};

export type UpdateUserDTO = Optional<CreateUserDTO, 'login'>;

export type FilterUserDTO = {
	isDeleted?: boolean;
	includeDeleted?: boolean;
};
