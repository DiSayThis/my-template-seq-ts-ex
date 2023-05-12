import jwt from 'jsonwebtoken';
import { IUser } from 'api/interfaces/user.interface.js';

export const getTokens = async (user: IUser) => {
	const userDataToken = {
		_id: user.id,
		login: user.login,
		isAdmin: user.isAdmin,
	};

	const salt = process.env.JWT_SALT || 'secret';
	const algorithm = 'HS256';

	const accessToken = await jwt.sign(userDataToken, salt, {
		expiresIn: '1h',
		algorithm,
	});

	const refreshToken = await jwt.sign(userDataToken, salt, {
		expiresIn: '3d',
		algorithm,
	});
	return { user: userDataToken, accessToken, refreshToken };
};
