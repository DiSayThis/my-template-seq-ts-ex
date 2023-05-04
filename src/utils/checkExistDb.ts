import { Sequelize } from 'sequelize';
import config, { IdbConfig } from '../config/database.js';

const isDev = process.env.NODE_ENV === 'development';
const dbConfig = !isDev ? config.development : config.production;

const checkExistDb = async (configDataBase: IdbConfig = dbConfig) => {
	const sequelize = await new Sequelize('postgres', configDataBase.username, configDataBase.password, configDataBase);
	const data = await sequelize.query(`SELECT * FROM pg_database WHERE datname = '${configDataBase.database}'`);
	if (!data[0].length) await sequelize.query(`CREATE DATABASE ${configDataBase.database}`);
};

export default checkExistDb;
