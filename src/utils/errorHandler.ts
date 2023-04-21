import { Response } from 'express';

export default (res: Response, error: Error, code = 500) => {
	res.status(code).json({
		success: false,
		message: error.message ? error.message : error,
	});
};
