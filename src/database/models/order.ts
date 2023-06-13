import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	CreationAttributes,
	Attributes,
	InferAttributes,
	InferCreationAttributes,
	BelongsToGetAssociationMixin,
	BelongsToCreateAssociationMixin,
	BelongsToSetAssociationMixin,
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
	ForeignKey,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import Product from './product.js';
import Division from './divisions.js';

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
	declare id: CreationOptional<string>;
	declare number: string;
	declare endDate: Date;
	declare signingDate: Date;
	declare signingPerson: CreationOptional<string>;
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

	declare DivisionId: ForeignKey<Division['id']>;
	declare getDivision: BelongsToGetAssociationMixin<Division>;
	declare setDivision: BelongsToSetAssociationMixin<Division, Division['id']>;
	declare createDivision: BelongsToCreateAssociationMixin<Division>;

	declare division: NonAttribute<Division>;
	declare products?: NonAttribute<Product[]>;

	get getDivisionName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.name);
	}
	get getDivisionShortName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.shortName);
	}
	get getDivisionId(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.id);
	}

	declare static associations: {
		products: Association<Order, Product>;
		division: Association<Division, Order>;
	};
}
export interface IOrderInput extends CreationAttributes<Order> {}
export interface IOrderOutput extends Attributes<Order> {}

Order.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		signingDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		signingPerson: {
			type: DataTypes.TEXT,
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
		modelName: 'Order',
	},
);

export default Order;
