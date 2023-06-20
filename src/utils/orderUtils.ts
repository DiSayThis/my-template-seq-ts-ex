import { IOrderOutput } from 'database/models/order.js';

export const orderUtils = (input: IOrderOutput[]) => {
	return input.map((tmp) => ({
		id: String(tmp.id),
		number: String(tmp.number),
		signingPerson: String(tmp.signingPerson),
		description: String(tmp.description),
		DivisionId: String(tmp.DivisionId),
		createdAt: String(tmp.createdAt),
		updatedAt: String(tmp.updatedAt),
		deletedAt: String(tmp.deletedAt),
		endDate:
			String(tmp.endDate).split('-')[2] +
			'.' +
			String(tmp.endDate).split('-')[1] +
			'.' +
			String(tmp.endDate).split('-')[0],
		signingDate:
			String(tmp.signingDate).split('-')[2] +
			'.' +
			String(tmp.signingDate).split('-')[1] +
			'.' +
			String(tmp.signingDate).split('-')[0],
	}));
};
