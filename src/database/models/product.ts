import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';

export interface IProductAttributes {
	id: string;
	name: string;
	description?: string;
	catalogNumber?: string;
	catalogNumberDualUse?: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IProductInput extends Optional<IProductAttributes, 'id'> {}
export interface IProductOutput extends Required<IProductAttributes> {}

class Product extends Model<IProductAttributes, IProductInput> {
	public id!: string;
	public name!: string;
	public description!: string;
	public catalogNum!: string;
	public catalogNumDualUse!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}
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
		description: {
			type: DataTypes.TEXT,
			// allowNull: false,
		},
		catalogNumber: {
			type: DataTypes.STRING,
			// allowNull: false,
		},
		catalogNumberDualUse: {
			type: DataTypes.STRING,
			// allowNull: false,
		},
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Product',
	},
);

export default Product;
