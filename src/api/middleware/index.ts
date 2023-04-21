import bodyParser from 'body-parser';
import { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

export default (app: Express): Express => {
	app.use(morgan('dev'));
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	return app;
};
