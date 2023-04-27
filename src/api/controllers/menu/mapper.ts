import { IMenuOutput } from '../../../database/models/menu.js';
import { IMenu } from '../../interfaces/menu.interface.js';

export const toMenuItem = (menu: IMenuOutput): IMenu => {
	return {
		id: menu.id,
		title: menu.title,
		icon: menu.icon,
		link: menu.link,

		createdAt: menu.createdAt,
		updatedAt: menu.updatedAt,
		deletedAt: menu.deletedAt,
	};
};
