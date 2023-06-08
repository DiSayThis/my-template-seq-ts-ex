import { UrlParams } from '../../../api/dto/classificator.dto.js';
import { IClassificatorTable } from '../../../interfaces/classificator.interface.js';
import { OrderItem, WhereAttributeHash, ModelStatic, CreationAttributes, Model, Attributes } from 'sequelize';
import { generateDAL } from '../../../database/dal/classificator/universal.dal.js';

interface IGenController<M extends Model> {
	model: ModelStatic<M>;
	generateWhere: (params: UrlParams) => {
		offset: number;
		limit: number;
		order: OrderItem[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		where: WhereAttributeHash<any>;
	};
}

export const generateController = <M extends Model>({ generateWhere, model }: IGenController<M>) => {
	const dal = generateDAL(model);
	return {
		getAll: async (params: UrlParams): Promise<IClassificatorTable<Attributes<M>>> => {
			const { where, order } = generateWhere(params);
			const data = await dal.getAllCount({ where, order });
			return { data: data.rows, meta: { totalRowCount: data.count } };
		},
		getAllCount: async (params: UrlParams): Promise<IClassificatorTable<Attributes<M>>> => {
			const queryParams = generateWhere(params);
			const data = await dal.getAllCount(queryParams);
			return { data: data.rows, meta: { totalRowCount: data.count } };
		},
		create: async (payload: CreationAttributes<M>): Promise<Attributes<M>> => {
			return await dal.create(payload);
		},
		getOne: async (id: string): Promise<Attributes<M>> => {
			return await dal.getOne(id);
		},
		deleteOne: async (id: string): Promise<void> => {
			return await dal.deleteOne(id);
		},
		update: async (payload: CreationAttributes<M>): Promise<Attributes<M>> => {
			return await dal.update(payload);
		},
	};
};
