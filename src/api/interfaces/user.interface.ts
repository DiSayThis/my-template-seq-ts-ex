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
	isAdmin?: boolean;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
}
