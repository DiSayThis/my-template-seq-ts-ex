import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserDTO } from 'api/dto/auth.dto.js';
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

// router.post('/getToken', (req, res) => {
//     if (!req.body.email || !req.body.password) {
//       return res.status(401).send('no fields');
//     }
//     User.forge({ email: req.body.email }).fetch().then(result => {
//       if (!result) {
//         return res.status(400).send('user not found');
//       }

//       result.authenticate(req.body.password).then(user => {
//         const payload = { id: user.id };
//         const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
//         res.send(token);
//       }).catch(err => {
//         return res.status(401).send({ err });
//       });
//     });
//   }
// );
