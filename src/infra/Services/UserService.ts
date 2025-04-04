import type { User } from "../../core/User/Entities/User_Entity";
import type { IUserRepository } from "../../core/User/Repositories/User_Repository";
import { createUser, userDelete, userLogin } from "../../core/User/UseCases";

export const userService = (ORMRepository: IUserRepository<User>) => ({
	create: createUser(ORMRepository),
	login: userLogin,
	delete: userDelete(ORMRepository),
});
