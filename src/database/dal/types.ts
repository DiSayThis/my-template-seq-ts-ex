interface IListFilters {
	isDeleted?: boolean;
	includeDeleted?: boolean;
}

export interface IGetAllUsersFilters extends IListFilters {}
export interface IGetAllFilters extends IListFilters {}
