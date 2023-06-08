import { Express, static as expressStatic } from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import menuRouter from './menu.route.js';
import generateRouter from './universal.route.js';
import Executor from '../../database/models/executor.js';
import Division from '../../database/models/divisions.js';
import { generateDivisionWhere, generateExecutorWhere, generateOrderWhere } from '../../utils/generateWhere.js';
import Order from '../../database/models/order.js';

export default (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/users', userRouter);
	app.use('/api/menu', menuRouter);
	app.use('/api/division', generateRouter(Division, generateDivisionWhere));
	app.use('/api/executor', generateRouter(Executor, generateExecutorWhere));
	app.use('/api/order', generateRouter(Order, generateOrderWhere));

	app.use('/', expressStatic('public'));
	return app;
};
