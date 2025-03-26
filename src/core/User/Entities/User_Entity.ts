import type { UserRole } from "@prisma/client";

export interface User {
	readonly id: number;
	readonly name: string;
	readonly email: string;
	readonly password: string;
	readonly role: UserRole;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}
