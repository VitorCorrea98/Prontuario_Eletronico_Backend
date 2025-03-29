import type { User } from "../../core/User/Entities/User_Entity";
import type { IUserRepository } from "../../core/User/Repositories/User_Repository";
import { createUser } from "../../core/User/UseCases/User_CreateUser";
import { userLogin } from "../../core/User/UseCases/User_Login";
import { PrismaUserRepository } from "../Repositories/PrismaUserRepository";

export const userService = (ORMRepository: IUserRepository<User>) => ({
	create: createUser(ORMRepository),
	login: userLogin(ORMRepository),
});
