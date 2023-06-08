import express from 'express';
import applyMiddlewares from './api/middleware/index.js';
import applyRoutes from './api/routes/index.js';
import dotenv from 'dotenv';
import checkExistDb from './utils/checkExistDb.js';
import firstUser from './utils/defaultRoot.js';
import sequelizeConnection from './database/init.js';
dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

// NOTE: Для затирания или мутации таблиц в бд. Поменяю на true если нужно
const force = isDev && true; // true
const alter = isDev && false;

const app = applyRoutes(applyMiddlewares(express()));
const port = process.env.PORT || 4200;

async function connectDb() {
	await checkExistDb();

	await sequelizeConnection
		.sync({ alter, force })
		.then(() => firstUser())
		.then(() =>
			app.listen(port, () => {
				console.log(`Running on http://localhost:${port}`);
			}),
		)
		.catch((e: Error) => console.log('Unable to connect to the database:', e));
}

connectDb();
