import {
	DataTypes,
	Model,
	UUID,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	CreationAttributes,
	Attributes,
} from 'sequelize';
import sequelizeConnection from '../init.js';

class Division extends Model<InferAttributes<Division>, InferCreationAttributes<Division>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare shortName: string;
	declare description: CreationOptional<string>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;
}
export interface IDivisionInput extends CreationAttributes<Division> {}
export interface IDivisionOutput extends Attributes<Division> {}

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
			type: DataTypes.TEXT,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'Division',
	},
);

export default Division;
