import { PrismaClient } from "../../node_modules/prisma/client";

let prismaInstance: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
	if (!prismaInstance) {
		prismaInstance = new PrismaClient();
	}
	return prismaInstance;
};
