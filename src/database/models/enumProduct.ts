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
} from 'sequelize';
import sequelizeConnection from '../init.js';
import Product from './product.js';

class EnumProduct extends Model<
	InferAttributes<EnumProduct, { omit: 'children' | 'parent' | 'products' }>,
	InferCreationAttributes<EnumProduct, { omit: 'children' | 'parent' | 'products' }>
> {
	declare id: CreationOptional<string>;
	declare number: string;
	declare name: string;
	declare description: CreationOptional<string>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;

	declare parentId: ForeignKey<EnumProduct['id']>;

	declare getParent: BelongsToGetAssociationMixin<EnumProduct>;
	declare setParent: BelongsToSetAssociationMixin<EnumProduct, string>;
	declare createParent: BelongsToCreateAssociationMixin<EnumProduct>;

	declare getChild: HasManyGetAssociationsMixin<EnumProduct>; // Note the null assertions!
	declare addChild: HasManyAddAssociationMixin<EnumProduct, string>;
	declare addChildren: HasManyAddAssociationsMixin<EnumProduct, string>;
	declare setChildren: HasManySetAssociationsMixin<EnumProduct, string>;
	declare removeChild: HasManyRemoveAssociationMixin<EnumProduct, string>;
	declare removeChildren: HasManyRemoveAssociationsMixin<EnumProduct, string>;
	declare hasChild: HasManyHasAssociationMixin<EnumProduct, string>;
	declare hasChildren: HasManyHasAssociationsMixin<EnumProduct, string>;
	declare countChildren: HasManyCountAssociationsMixin;
	declare createChild: HasManyCreateAssociationMixin<EnumProduct, 'parentId'>;

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

	declare children?: NonAttribute<EnumProduct[]>;
	declare parent?: NonAttribute<EnumProduct>;
	declare products?: NonAttribute<Product[]>;

	declare static associations: {
		parent: Association<EnumProduct, EnumProduct>;
		children: Association<EnumProduct, EnumProduct>;
		products: Association<EnumProduct, Product>;
	};
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
		number: {
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
