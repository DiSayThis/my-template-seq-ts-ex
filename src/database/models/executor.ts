import {
	DataTypes,
	Model,
	UUID,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	CreationAttributes,
	Attributes,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManySetAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	Association,
	NonAttribute,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import Product from './product.js';

class Executor extends Model<InferAttributes<Executor>, InferCreationAttributes<Executor>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare shortName: string;
	declare inn: string;
	declare description: CreationOptional<string>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;

	declare getProducts: HasManyGetAssociationsMixin<Product>;
	declare addProduct: HasManyAddAssociationMixin<Product, string>;
	declare addProducts: HasManyAddAssociationsMixin<Product, string>;
	declare setProducts: HasManySetAssociationsMixin<Product, string>;
	declare removeProduct: HasManyRemoveAssociationMixin<Product, string>;
	declare removeProducts: HasManyRemoveAssociationsMixin<Product, string>;
	declare hasProduct: HasManyHasAssociationMixin<Product, string>;
	declare hasProducts: HasManyHasAssociationsMixin<Product, string>;
	declare countProducts: HasManyCountAssociationsMixin;
	declare createProduct: HasManyCreateAssociationMixin<Product>;

	declare products?: NonAttribute<Product[]>;

	declare static associations: {
		products: Association<Executor, Product>;
	};
}
export interface IExecutorInput extends CreationAttributes<Executor> {}
export interface IExecutorOutput extends Attributes<Executor> {}

Executor.init(
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
		inn: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Executor',
	},
);

export default Executor;
