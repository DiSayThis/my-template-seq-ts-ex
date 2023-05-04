import {
	DataTypes,
	Model,
	UUID,
	Optional,
	HasManyRemoveAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManySetAssociationsMixin,
	HasManyRemoveAssociationsMixin,
	HasManyCreateAssociationMixin,
	Association,
	NonAttribute,
} from 'sequelize';
import sequelizeConnection from '../init.js';
import Menu from './menu.js';
import Division from './divisions.js';

export interface IUserAttributes {
	id: string;
	login: string;
	password: string;
	firstName: string;
	lastName: string;
	thirdName?: string;
	phoneOS?: string;
	phoneMGTS?: string;
	description?: string;
	position?: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export interface IUserInput extends Optional<IUserAttributes, 'id'> {}
export interface IUserOutput extends Required<IUserAttributes> {}

class User extends Model<IUserAttributes, IUserInput> {
	public id!: string;
	public login!: string;
	public password!: string;
	public firstName!: string;
	public lastName!: string;
	public thirdName!: string;
	public phoneOS!: string;
	public phoneMGTS!: string;
	public position!: string;
	public description!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

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
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
		modelName: 'User',
	},
);

export default User;
