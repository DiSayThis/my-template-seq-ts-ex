import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	CreationAttributes,
	Attributes,
	ForeignKey,
	BelongsToGetAssociationMixin,
	BelongsToSetAssociationMixin,
	BelongsToCreateAssociationMixin,
	NonAttribute,
	Association,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import EnumProduct from './enumProduct.js';
import Executor from './executor.js';
import Order from './order.js';
import Division from './divisions.js';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare shortName: CreationOptional<string>;
	declare catalogNumber: CreationOptional<string>;
	declare catalogNumberDualUse: CreationOptional<string>;
	declare description: CreationOptional<string>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;

	declare EnumProductId: ForeignKey<EnumProduct['id']>;
	declare getEnumProduct: BelongsToGetAssociationMixin<EnumProduct>;
	declare setEnumProduct: BelongsToSetAssociationMixin<EnumProduct, EnumProduct['id']>;
	declare createEnumProduct: BelongsToCreateAssociationMixin<EnumProduct>;

	declare ExecutorId: ForeignKey<Executor['id']>;
	declare getExecutor: BelongsToGetAssociationMixin<Executor>;
	declare setExecutor: BelongsToSetAssociationMixin<Executor, Executor['id']>;
	declare createExecutor: BelongsToCreateAssociationMixin<Executor>;

	declare OrderId: ForeignKey<Order['id']>;
	declare getOrder: BelongsToGetAssociationMixin<Order>;
	declare setOrder: BelongsToSetAssociationMixin<Order, Order['id']>;
	declare createOrder: BelongsToCreateAssociationMixin<Order>;

	declare DivisionId: ForeignKey<Division['id']>;
	declare getDivision: BelongsToGetAssociationMixin<Division>;
	declare setDivision: BelongsToSetAssociationMixin<Division, Division['id']>;
	declare createDivision: BelongsToCreateAssociationMixin<Division>;

	declare enumProduct?: NonAttribute<EnumProduct>;
	declare executor?: NonAttribute<Executor>;
	declare order?: NonAttribute<Order>;
	declare division?: NonAttribute<Division>;

	get getDivisionName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.name);
	}
	get getDivisionShortName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.shortName);
	}
	get getDivisionId(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.id);
	}

	get getExecutorName(): NonAttribute<Promise<string>> {
		return this.getExecutor().then((res) => res.name);
	}
	get getExecutorShortName(): NonAttribute<Promise<string>> {
		return this.getExecutor().then((res) => res.shortName);
	}
	get getExecutorId(): NonAttribute<Promise<string>> {
		return this.getExecutor().then((res) => res.id);
	}

	get getEnumProductName(): NonAttribute<Promise<string>> {
		return this.getEnumProduct().then((res) => res.name);
	}
	get getEnumProductNum(): NonAttribute<Promise<string>> {
		return this.getEnumProduct().then((res) => res.number);
	}
	get getEnumProductId(): NonAttribute<Promise<string>> {
		return this.getEnumProduct().then((res) => res.id);
	}

	get getOrderId(): NonAttribute<Promise<string>> {
		return this.getOrder().then((res) => res.id);
	}
	get getOrderNum(): NonAttribute<Promise<string>> {
		return this.getOrder().then((res) => res.number);
	}

	declare static associations: {
		enumProduct: Association<EnumProduct, Product>;
		executor: Association<Executor, Product>;
		order: Association<Order, Product>;
		division: Association<Division, Product>;
	};
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
