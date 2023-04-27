import { TypeMaterialIconName } from './icons.types.js';

export interface IMenu {
	id: string;
	title: string;
	icon: TypeMaterialIconName;
	link: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
}
