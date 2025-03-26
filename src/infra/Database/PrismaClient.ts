import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
	if (!prismaInstance) {
		prismaInstance = new PrismaClient();
	}
	return prismaInstance;
};
