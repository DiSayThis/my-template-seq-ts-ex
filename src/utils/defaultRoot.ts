import bcrypt from 'bcryptjs';
import { create as createUser, getAll as getAllUsers } from '../api/controllers/user/user.controller.js';
import { create as createMenuItem } from '../api/controllers/menu/menu.controller.js';
import { CreateUserDTO } from '../api/dto/user.dto.js';

const firstUser = async () => {
	const all = await getAllUsers({});
	if (!all.length) {
		const password = bcrypt.hashSync('123789456', bcrypt.genSaltSync(10));
		const root: CreateUserDTO = {
			login: 'root',
			password: password,
			firstName: 'root',
			lastName: 'root',
			phoneOS: '000000',
			phoneMGTS: '000000',
			position: 'root',
			isAdmin: true,
		};
		createUser(root).then((user) => console.log(`${user.login} пользователь создан`));
		createMenuItem({ title: 'Реестр единственных поставщиков', icon: 'MdChromeReaderMode', link: '/products' });
		createMenuItem({ title: 'Подразделения', icon: 'MdShield', link: '/manage/division' });
		createMenuItem({ title: 'Исполнители', icon: 'MdEngineering', link: '/manage/executor' });
		createMenuItem({ title: 'Приказы', icon: 'MdDocumentScanner', link: '/manage/order' });
		createMenuItem({ title: 'Перечень товаров, работ и услуг', icon: 'MdListAlt', link: '/manage/enumProducts' });
	} else console.log(`root не создан`);
};

export default firstUser;
