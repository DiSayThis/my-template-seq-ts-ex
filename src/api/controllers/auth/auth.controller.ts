import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserDTO } from '../../dto/auth.dto.js';
import { getByLogin } from '../user/user.controller.js';

export const login = async (payload: AuthUserDTO) => {
	const user = await getByLogin(payload.login).catch(() => {
		throw new Error('401 Ошибка авторизации!');
	});
	if (user) {
		const passwordResult = bcrypt.compareSync(payload.password, user.password);
		console.log(passwordResult, payload.password, user.password);
		if (passwordResult) {
			const token = jwt.sign(
				{
					login: user.login,
					userId: user.id,
				},
				process.env.JWT_SALT || 'secret',
				{ expiresIn: '9h' },
			);

			return {
				user: { _id: user.id, login: user.login, isAdmin: true },
				accessToken: token,
				refreshToken: token,
			};
		}
	}
	throw new Error('401 Ошибка авторизации!');
};

export const logout = async () => {
	return {};
};

export const whoami = async () => {
	return {};
};
