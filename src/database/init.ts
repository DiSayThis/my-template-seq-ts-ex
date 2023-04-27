import { Sequelize } from 'sequelize';
import config from '../config/database.js';

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const dbConfig = isDev ? config.development : config.production;

const sequelizeConnection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default sequelizeConnection;
