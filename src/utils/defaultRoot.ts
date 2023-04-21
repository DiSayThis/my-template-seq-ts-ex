import bcrypt from 'bcryptjs';
import { create, getAll } from '../api/controllers/user/user.controller.js';
import { CreateUserDTO } from '../api/dto/user.dto.js';

const firstUser = async () => {
	const all = await getAll({});
	if (!all.length) {
		const password = bcrypt.hashSync('admin', bcrypt.genSaltSync(10));
		const root: CreateUserDTO = {
			login: 'admin',
			password: password,
			firstName: 'admin',
			lastName: 'admin',
			phoneOS: '000000',
			phoneMGTS: '000000',
			position: 'root',
		};
		create(root).then((user) => console.log(`${user.login} пользователь создан`));
	} else console.log(`admin не создан`);
};

export default firstUser;