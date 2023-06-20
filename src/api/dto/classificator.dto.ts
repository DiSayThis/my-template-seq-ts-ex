export type FilterDivisionClassificator = {
	isDeleted?: boolean;
	includeDeleted?: boolean;
};

export type UrlParams = {
	start?: string;
	size?: string;
	filters?: string;
	sorting?: string;
	globalFilter?: string;
};

export interface filtersParam {
	id: string;
	value: string;
}

export interface sortingParam {
	id: string;
	desc: boolean;
}

export type CreateDivisionDTO = {
	id: string;
	name: string;
	shortName: string;
	description?: string;
};

export type GetOneByIdType = {
	id?: string;
};

export interface IOrderDTO {
	id: string;
	number: string;
	signingDate: string;
	endDate: string;
	signingPerson: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	DivisionId: string;
}
