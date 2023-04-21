import { Express, static as expressStatic } from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';

export default (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/users', userRouter);

	app.use('/', expressStatic('public'));
	return app;
};
