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

class EnumProduct extends Model<InferAttributes<EnumProduct>, InferCreationAttributes<EnumProduct>> {
	declare id: CreationOptional<string>;
	declare num: string;
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

	declare children: NonAttribute<EnumProduct[]>;

	declare static associations: {
		children: Association<EnumProduct, EnumProduct>;
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
