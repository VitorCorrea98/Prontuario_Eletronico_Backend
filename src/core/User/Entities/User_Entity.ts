import type { UserRole } from "../../../../prisma/client";

export type User = Readonly<{
	id: number;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}>;
