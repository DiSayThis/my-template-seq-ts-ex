import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	CreationAttributes,
	Attributes,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import sequelizeConnection from '../init.js';

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
