import bcrypt from 'bcryptjs';
import { create as createUser, getAll as getAllUsers } from '../api/controllers/user/user.controller.js';
import { create as createMenuItem } from '../api/controllers/menu/menu.controller.js';

import { IUserInput } from '../database/models/user.js';
import EnumProduct from '../database/models/enumProduct.js';

const firstUser = async () => {
	const all = await getAllUsers({});
	if (!all.length) {
		const password = bcrypt.hashSync('123789456', bcrypt.genSaltSync(10));
		const root: IUserInput = {
			login: 'root',
			password: password,
			firstName: 'root',
			lastName: 'root',
			isAdmin: true,
		};

		const test = async () => {
			//для теста связей
			const one = await EnumProduct.create({ name: '111', number: '111' });
			const two = await EnumProduct.create({ name: '222', number: '222' });
			await one.addChild(two);
		};
		Promise.all([
			createUser(root).then((user) => console.log(`${user.login} пользователь создан`)),
			createMenuItem({ name: 'Реестр единственных поставщиков', icon: 'MdChromeReaderMode', link: '/products' }),
			createMenuItem({ name: 'Подразделения', icon: 'MdShield', link: '/manage/division' }),
			createMenuItem({ name: 'Исполнители', icon: 'MdEngineering', link: '/manage/executor' }),
			createMenuItem({ name: 'Приказы', icon: 'MdDocumentScanner', link: '/manage/order' }),
			createMenuItem({ name: 'Перечень товаров, работ и услуг', icon: 'MdListAlt', link: '/manage/enumProduct' }),
			test(),
		])
			.then(() => console.log(`Данные по умолчанию заведены`))
			.catch((error) => console.log(error));
	} else console.log(`root уже существует`);
};

export default firstUser;
