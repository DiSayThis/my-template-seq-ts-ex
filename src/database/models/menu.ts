import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';
import { TypeMaterialIconName } from '../../api/interfaces/icons.types.js';
import User from './user.js';

export interface IMenuAttributes {
	id: string;
	title: string;
	icon: TypeMaterialIconName;
	link: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IMenuInput extends Optional<IMenuAttributes, 'id'> {}
export interface IMenuOutput extends Required<IMenuAttributes> {}

class Menu extends Model<IMenuAttributes, IMenuInput> {
	public id!: string;
	public title!: string;
	public icon!: TypeMaterialIconName;
	public link!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Menu.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		icon: {
			type: DataTypes.STRING,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Menu',
	},
);

export default Menu;
