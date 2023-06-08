import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	CreationAttributes,
	Attributes,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import { TypeMaterialIconName } from '../../interfaces/icons.types.js';

class Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare icon: TypeMaterialIconName;
	declare link: string;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;
}
export interface IMenuInput extends CreationAttributes<Menu> {}
export interface IMenuOutput extends Attributes<Menu> {}

Menu.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		name: {
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
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Menu',
	},
);

export default Menu;
