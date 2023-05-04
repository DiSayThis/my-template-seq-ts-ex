import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';

export interface IEnumProductAttributes {
	id: string;
	num: string;
	name: string;
	description?: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IEnumProductInput extends Optional<IEnumProductAttributes, 'id'> {}
export interface IEnumProductOutput extends Required<IEnumProductAttributes> {}

class EnumProduct extends Model<IEnumProductAttributes, IEnumProductInput> {
	public id!: string;
	public num!: string;
	public name!: string;
	public description!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

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
			// allowNull: false,
		},
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'EnumProduct',
	},
);

export default EnumProduct;
