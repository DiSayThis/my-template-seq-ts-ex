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

class EnumProduct extends Model<InferAttributes<EnumProduct>, InferCreationAttributes<EnumProduct>> {
	declare id: CreationOptional<string>;
	declare num: string;
	declare name: string;
	declare description: CreationOptional<string>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;
}
export interface IEnumProductInput extends CreationAttributes<EnumProduct> {}
export interface IEnumProductOutput extends Attributes<EnumProduct> {}

EnumProduct.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		num: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'EnumProduct',
	},
);

export default EnumProduct;
