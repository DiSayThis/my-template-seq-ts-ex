export interface IClassificatorDivision {
	data: IOutDivision[];
	meta: {
		totalRowCount: number;
	};
}

export interface IOutDivision {
	id: string;
	name: string;
	shortName: string;
	description?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
}
