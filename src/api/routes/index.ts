import { Express, static as expressStatic } from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import menuRouter from './menu.route.js';
import divisionRouter from './division.route.js';
import executorRouter from './executor.route.js';
import orderRouter from './order.route.js';
import enumProductRouter from './enumProduct.route.js';

export default (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/users', userRouter);
	app.use('/api/menu', menuRouter);
	app.use('/api/division', divisionRouter);
	app.use('/api/executor', executorRouter);
	app.use('/api/order', orderRouter);
	app.use('/api/enumProduct', enumProductRouter);

	app.use('/', expressStatic('public'));
	return app;
};
