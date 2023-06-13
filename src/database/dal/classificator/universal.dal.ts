import { ICountOutput } from '../../models/index.js';
import { queryCountParamsDTO } from 'api/dto/filters.dto.js';
import { Attributes, CreationAttributes, Model, ModelStatic } from 'sequelize';

export const generateDAL = <M extends Model>(model: ModelStatic<M>) => ({
	getAll: async (queryParams: queryCountParamsDTO): Promise<ICountOutput<Attributes<M>>> => {
		const { where, order } = queryParams;
		const data = model.findAndCountAll({ where, order }).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return data;
	},

	getAllCount: async (queryParams: queryCountParamsDTO): Promise<ICountOutput<Attributes<M>>> => {
		return model.findAndCountAll(queryParams).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
	},

	getCount: async (queryParams: queryCountParamsDTO): Promise<number> => {
		const { where } = queryParams;
		return model.count({ where }).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
	},

	create: async (payload: CreationAttributes<M>): Promise<Attributes<M>> => {
		const item = await model.create(payload).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		return item;
	},

	getOne: async (id: string): Promise<Attributes<M>> => {
		const item = await model.findByPk(id).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		if (!item) {
			throw new Error('Запись не найдена');
		}
		return item;
	},

	deleteOne: async (id: string): Promise<void> => {
		await model
			.findByPk(id)
			.then((result) => {
				if (!result) throw new Error('Запись не найдена');
				return result.destroy();
			})
			.catch((e) => {
				throw new Error('Ошибка бд: ' + e.message);
			});
	},

	update: async (payload: CreationAttributes<M>): Promise<Attributes<M>> => {
		const item = await model.findByPk(payload.id).catch((e: Error) => {
			throw new Error('Ошибка бд: ' + e.message);
		});
		if (item) {
			item?.set(payload);
			await item.save().catch((e: Error) => {
				throw new Error('Ошибка бд: ' + e.message);
			});
			return item;
		} else throw new Error('Ошибка: Такое подразделение не найдено!');
	},
});
