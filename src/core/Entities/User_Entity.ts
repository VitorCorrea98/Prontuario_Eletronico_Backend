export type User = Readonly<{
	id: number;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}>;

export type UserRole = "ADMIN" | "NURSE";
