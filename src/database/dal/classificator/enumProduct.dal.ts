import { EnumProduct, ICountOutput } from '../../models/index.js';
import { IEnumProductInput, IEnumProductOutput } from 'database/models/enumProduct.js';
import { queryCountParamsDTO } from 'api/dto/filters.dto.js';
import { IGetOneEnumProductPayload } from 'interfaces/classificator.interface.js';

export const getAll = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IEnumProductOutput>> => {
	const { where, order } = queryParams;
	return EnumProduct.findAndCountAll({ where, order }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const getAllCount = async (queryParams: queryCountParamsDTO): Promise<ICountOutput<IEnumProductOutput>> => {
	const result = EnumProduct.findAndCountAll({ ...queryParams, include: [EnumProduct.associations.parent] }).catch(
		(e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		},
	); //сделать родительский вывод
	return result;
};

export const getCount = async (queryParams: queryCountParamsDTO): Promise<number> => {
	const { where } = queryParams;
	return EnumProduct.count({ where }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
};

export const create = async (payload: IGetOneEnumProductPayload): Promise<IEnumProductOutput> => {
	const parent = payload.parent ? await getOne(payload.parent.id) : null;

	const result = await EnumProduct.create(payload).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (parent && result) await result.setParent(parent);
	return result;
};

export const getOne = async (id: string): Promise<EnumProduct> => {
	const item = await EnumProduct.findByPk(id, { include: { all: true } }).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (!item) {
		throw new Error('Запись не найдена');
	}
	console.log('getOne', item);

	return item;
};

export const deleteOne = async (id: string): Promise<void> => {
	await EnumProduct.findByPk(id)
		.then((result) => {
			if (!result) throw new Error('Запись не найдена');
			return result.destroy();
		})
		.catch((e) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
};

export const update = async (payload: IGetOneEnumProductPayload): Promise<IEnumProductOutput> => {
	const item = await EnumProduct.findByPk(payload.id).catch((e: Error) => {
		throw new Error('Ошибка бд: ' + e.message);
	});
	if (item) {
		item.set(payload);
		const parent = payload.parent ? await getOne(payload.parent.id) : null;
		if (parent) await item.setParent(parent);
		await item.save().catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return item;
	} else throw new Error('Ошибка: Такое подразделение не найдено!');
};
