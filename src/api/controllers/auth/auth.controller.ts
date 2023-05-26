import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserDTO } from '../../dto/auth.dto.js';
import { getById, getByLogin } from '../user/user.controller.js';
import { getTokens } from '../../../utils/getTokens.js';

export const login = async (payload: AuthUserDTO) => {
	const user = await getByLogin(payload.login).catch(() => {
		throw new Error('401 Ошибка авторизации!');
	});
	if (user) {
		const passwordResult = bcrypt.compareSync(payload.password, user.password);
		if (passwordResult) {
			const tokens = await getTokens(user);
			return tokens;
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

interface IRefreshTokenBody {
	refreshToken: string;
}
export const getNewToken = async ({ refreshToken }: IRefreshTokenBody) => {
	if (!refreshToken) throw new Error('Пожалуйста авторизуйтесь');
	const result: any = jwt.verify(refreshToken, process.env.JWT_SALT || 'secret');
	if (!result) throw new Error('Токен неверен или истек');
	const user = await getById(result._id);
	if (user) {
		const tokens = getTokens(user);
		return tokens;
	}

	throw new Error('Ошибка в БД');
};
