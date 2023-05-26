import { DataTypes, Model, UUID, Optional } from 'sequelize';
import sequelizeConnection from '../init.js';

export interface IDivisionAttributes {
	id: string;
	name: string;
	shortName: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}
export interface IDivisionInput extends Optional<IDivisionAttributes, 'id'> {}
export interface IDivisionOutput extends Required<IDivisionAttributes> {}

export interface IDivisionCountOutput {
	rows: IDivisionOutput[];
	count: number;
}
class Division extends Model<IDivisionAttributes, IDivisionInput> {
	public id!: string;
	public name!: string;
	public shortName!: string;
	public description!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Division.init(
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
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Division',
	},
);

export default Division;
