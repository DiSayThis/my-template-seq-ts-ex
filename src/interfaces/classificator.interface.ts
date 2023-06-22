import { IEnumProductInput, IEnumProductOutput } from 'database/models/enumProduct.js';

export interface IClassificatorTable<T> {
	data: T[];
	meta: {
		totalRowCount: number;
	};
}

export interface IGetOneEnumProductPayload extends IEnumProductInput {
	parent?: IEnumProductOutput;
}
