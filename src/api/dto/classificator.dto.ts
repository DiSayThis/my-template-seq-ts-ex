export type FilterDivisionClassificator = {
	isDeleted?: boolean;
	includeDeleted?: boolean;
};

export type CreateDivisionDTO = {
	id: string;
	name: string;
	shortName: string;
	description?: string;
};
