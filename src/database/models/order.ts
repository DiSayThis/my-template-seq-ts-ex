import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';
export interface IOrderAttributes {
	id: string;
	number: string;
	signingPerson: string;
	signingDate: Date;
	endDate: Date;
	description?: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IOrderInput extends Optional<IOrderAttributes, 'id'> {}
export interface IOrderOutput extends Required<IOrderAttributes> {}

class Order extends Model<IOrderAttributes, IOrderInput> {
	public id!: string;
	public number!: string;
	public signingDate!: Date;
	public endDate!: Date;
	public signingPerson!: string;
	public description!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}
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
		modelName: 'Order',
	},
);

export default Order;
