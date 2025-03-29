import type { User } from "../Entities/User_Entity";
import type { IUserReadRepository } from "../Repositories/User_Repository";

export const findUserByEmail =
	(userRepository: IUserReadRepository<User>) =>
	async (email: string): Promise<User | null> => {
		const userFound = await userRepository.findByEmail(email);

		if (!userFound) return null;

		return userFound;
	};
