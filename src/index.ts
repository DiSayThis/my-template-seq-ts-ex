import express from 'express';
import applyMiddlewares from './api/middleware/index.js';
import applyRoutes from './api/routes/index.js';
import dotenv from 'dotenv';
import checkExistDb from './utils/checkExistDb.js';
import dbInit from './database/init.js';
import firstUser from './utils/defaultRoot.js';
dotenv.config();

const app = applyRoutes(applyMiddlewares(express()));
const port = process.env.PORT || 3010;

function connectDb() {
	checkExistDb()
		.then(() => dbInit())
		.then(() => firstUser())
		.then(() => app.listen(port, () => console.log(`Running on http://localhost:${port}`)))
		.catch((e: Error) => console.log('Unable to connect to the database:', e));
}

connectDb();
