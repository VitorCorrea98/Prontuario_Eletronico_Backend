import type { IUserRepository } from "../Repositories/User_Repository";

export const findUserByEmail =
	<T>(userRepository: IUserRepository<T>) =>
	async (email: string): Promise<T | null> => {
		const userFound = await userRepository.findByEmail(email);

		if (!userFound) return null;

		return userFound;
	};
