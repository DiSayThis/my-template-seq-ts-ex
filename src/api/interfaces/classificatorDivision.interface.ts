
export interface IClassificatorDivision {
	id: string;
	name: string;
	shortName: string;
	description?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
}