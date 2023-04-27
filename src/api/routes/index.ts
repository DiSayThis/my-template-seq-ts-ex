import { Express, static as expressStatic } from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import menuRouter from './menu.route.js';

export default (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/users', userRouter);
	app.use('/api/menu', menuRouter);

	app.use('/', expressStatic('public'));
	return app;
};
