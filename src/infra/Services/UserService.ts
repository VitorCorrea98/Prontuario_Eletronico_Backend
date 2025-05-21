import type { User } from "../../core/Entities/User_Entity";
import type { IUserRepository } from "../../core/Repositories/User_Repository";
import { createUser, userDelete, userLogin } from "../../core/UseCases/User";

export const userService = (ORMRepository: IUserRepository<User>) => ({
	create: createUser(ORMRepository),
	login: userLogin,
	delete: userDelete(ORMRepository),
});
