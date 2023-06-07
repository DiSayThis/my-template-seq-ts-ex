export interface IClassificatorTable<T> {
	data: T[];
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
