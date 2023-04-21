export interface IUser {
	id: string;
	login: string;
	password: string;
	firstName: string;
	lastName: string;
	thirdName?: string;
	phoneOS?: string;
	phoneMGTS?: string;
	position?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}
