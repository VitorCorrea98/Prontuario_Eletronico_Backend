import { getPrismaClient } from "../../config/prisma";
import type { User } from "../../core/User/Entities/User_Entity";
import type { IUserRepository } from "../../core/User/Repositories/User_Repository";

const prisma = getPrismaClient();

export const PrismaUserRepository: IUserRepository<User> = {
	async create(userLoginForm) {
		return await prisma.user.create({ data: userLoginForm });
	},

	async findByEmail(email) {
		return await prisma.user.findUnique({ where: { email } });
	},
};
