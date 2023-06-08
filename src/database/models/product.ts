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

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare shortName: CreationOptional<string>;
	declare catalogNumber: CreationOptional<string>;
	declare catalogNumberDualUse: CreationOptional<string>;
	declare description: CreationOptional<string>;

	//Приказы

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;
}

export interface IProductInput extends CreationAttributes<Product> {}
export interface IProductOutput extends Attributes<Product> {}

Product.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shortName: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
		catalogNumber: {
			type: DataTypes.STRING,
		},
		catalogNumberDualUse: {
			type: DataTypes.STRING,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Product',
	},
);

export default Product;
