import { Optional } from 'sequelize';
import { TypeMaterialIconName } from '../interfaces/icons.types.js';

export type CreateMenuDTO = {
	title: string;
	icon: TypeMaterialIconName;
	link: string;
};

export type UpdateMenuDTO = Optional<CreateMenuDTO, 'title'>;

export type FilterMenuDTO = {
	isDeleted?: boolean;
	includeDeleted?: boolean;
};
