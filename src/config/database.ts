import dotenv from 'dotenv';
dotenv.config();

interface IdbConfig {
	username: string;
	password: string;
	host: string;
	database: string;
	dialect: 'postgres';
	logging?: boolean;
}

interface ISequelizeConfig {
	development: IdbConfig;
	test: IdbConfig;
	production: IdbConfig;
}

const dbConfig: ISequelizeConfig = {
	development: {
		username: process.env.DB_DEV_USERNAME || '',
		password: process.env.DB_DEV_PASSWORD || '',
		database: process.env.DB_DEV_NAME || '',
		host: process.env.DB_DEV_HOST || '',
		dialect: 'postgres',
		logging: true,
	},
	test: {
		username: process.env.DB_DEV_USERNAME || '',
		password: process.env.DB_DEV_PASSWORD || '',
		database: process.env.DB_DEV_NAME || '',
		host: process.env.DB_DEV_HOST || '',
		dialect: 'postgres',
		logging: true,
	},
	production: {
		username: process.env.DB_USERNAME || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || '',
		host: process.env.DB_HOST || '',
		dialect: 'postgres',
		logging: false,
	},
};

export default dbConfig;
