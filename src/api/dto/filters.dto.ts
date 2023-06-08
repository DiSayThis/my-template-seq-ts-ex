import { Order, WhereOptions } from 'sequelize';

export type FilterDeletedDTO = {
	isDeleted?: boolean;
	includeDeleted?: boolean;
};

export interface queryCountParamsDTO {
	offset?: number;
	limit?: number;
	order?: Order;
	where?: WhereOptions;
}
