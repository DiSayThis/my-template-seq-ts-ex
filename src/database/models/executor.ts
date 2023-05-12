import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';

export interface IExecutorAttributes {
	id: string;
	name: string;
	shortName: string;
	description?: string;
	inn: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IExecutorInput extends Optional<IExecutorAttributes, 'id'> {}
export interface IExecutorOutput extends Required<IExecutorAttributes> {}

class Executor extends Model<IExecutorAttributes, IExecutorInput> {
	public id!: string;
	public name!: string;
	public shortName!: string;
	public description!: string;
	public inn!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}
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
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Executor',
	},
);

export default Executor;
