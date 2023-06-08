import {
	DataTypes,
	Model,
	UUID,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	CreationAttributes,
	Attributes,
} from 'sequelize';
import sequelizeConnection from '../init.js';

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
