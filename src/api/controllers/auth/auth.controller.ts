import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserDTO } from '../../dto/auth.dto.js';
import { getByLogin } from '../user/user.controller.js';

export const login = async (payload: AuthUserDTO) => {
	const user = await getByLogin(payload.login);
	if (user) {
		const passwordResult = bcrypt.compareSync(payload.password, user.password);

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
				token: `Bearer ${token}`,
				userId: user.id,
			};
		}
	}

	throw new Error('Ошибка авторизации!');
};

export const logout = async () => {
	return {};
};

export const whoami = async () => {
	return {};
};
