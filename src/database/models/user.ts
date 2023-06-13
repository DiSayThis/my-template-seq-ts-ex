import {
	DataTypes,
	Model,
	UUID,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	CreationAttributes,
	Attributes,
	BelongsToCreateAssociationMixin,
	BelongsToSetAssociationMixin,
	BelongsToGetAssociationMixin,
	ForeignKey,
	NonAttribute,
	Association,
} from 'sequelize';

import sequelizeConnection from '../init.js';
import Division from './divisions.js';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<string>;
	declare login: string;
	declare password: string;
	declare firstName: string;
	declare lastName: string;
	declare thirdName: CreationOptional<string>;
	declare phoneOS: CreationOptional<string>;
	declare phoneMGTS: CreationOptional<string>;
	declare position: CreationOptional<string>;
	declare description: CreationOptional<string>;
	declare isAdmin: CreationOptional<boolean>;

	// timestamps
	declare readonly createdAt: CreationOptional<Date>;
	declare readonly updatedAt: CreationOptional<Date>;
	declare readonly deletedAt: CreationOptional<Date>;

	declare DivisionId: ForeignKey<Division['id']>;
	declare getDivision: BelongsToGetAssociationMixin<Division>;
	declare setDivision: BelongsToSetAssociationMixin<Division, Division['id']>;
	declare createDivision: BelongsToCreateAssociationMixin<Division>;

	declare division: NonAttribute<Division>;

	get getDivisionName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.name);
	}
	get getDivisionShortName(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.shortName);
	}
	get getDivisionId(): NonAttribute<Promise<string>> {
		return this.getDivision().then((res) => res.id);
	}

	declare static associations: {
		division: Association<Division, User>;
	};
}

export interface IUserInput extends CreationAttributes<User> {}
export interface IUserOutput extends Attributes<User> {}

User.init(
	{
		id: {
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		thirdName: {
			type: DataTypes.STRING,
		},
		phoneOS: {
			type: DataTypes.STRING,
		},
		phoneMGTS: {
			type: DataTypes.STRING,
		},
		position: {
			type: DataTypes.TEXT,
		},
		description: {
			type: DataTypes.TEXT,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'User',
	},
);

export default User;
