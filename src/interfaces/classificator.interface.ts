export interface IClassificatorTable<T> {
	data: T[];
	meta: {
		totalRowCount: number;
	};
}
