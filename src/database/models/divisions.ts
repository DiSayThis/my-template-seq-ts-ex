import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	CreationAttributes,
	Attributes,
	NonAttribute,
	Association,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyHasAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManySetAssociationsMixin,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import Product from './product.js';
import Order from './order.js';
import User from './user.js';

class Division extends Model<InferAttributes<Division>, InferCreationAttributes<Division>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare shortName: string;
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

	declare getOrders: HasManyGetAssociationsMixin<Order>;
	declare addOrder: HasManyAddAssociationMixin<Order, string>;
	declare addOrders: HasManyAddAssociationsMixin<Order, string>;
	declare setOrders: HasManySetAssociationsMixin<Order, string>;
	declare removeOrder: HasManyRemoveAssociationMixin<Order, string>;
	declare removeOrders: HasManyRemoveAssociationsMixin<Order, string>;
	declare hasOrder: HasManyHasAssociationMixin<Order, string>;
	declare hasOrders: HasManyHasAssociationsMixin<Order, string>;
	declare countOrders: HasManyCountAssociationsMixin;
	declare createOrder: HasManyCreateAssociationMixin<Order>;

	declare getUsers: HasManyGetAssociationsMixin<User>;
	declare addUser: HasManyAddAssociationMixin<User, string>;
	declare addUsers: HasManyAddAssociationsMixin<User, string>;
	declare setUsers: HasManySetAssociationsMixin<User, string>;
	declare removeUser: HasManyRemoveAssociationMixin<User, string>;
	declare removeUsers: HasManyRemoveAssociationsMixin<User, string>;
	declare hasUser: HasManyHasAssociationMixin<User, string>;
	declare hasUsers: HasManyHasAssociationsMixin<User, string>;
	declare countUsers: HasManyCountAssociationsMixin;
	declare createUser: HasManyCreateAssociationMixin<User>;

	declare products?: NonAttribute<Product[]>;
	declare orders?: NonAttribute<Product[]>;
	declare users?: NonAttribute<Product[]>;

	declare static associations: {
		products: Association<Division, Product>;
		orders: Association<Division, Order>;
		users: Association<Division, User>;
	};
}

export interface IDivisionInput extends CreationAttributes<Division> {}
export interface IDivisionOutput extends Attributes<Division> {}

Division.init(
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
		modelName: 'Division',
	},
);

export default Division;
