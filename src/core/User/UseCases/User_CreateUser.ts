import type { IUserRepository } from "../Repositories/User_Repository";

export const createUser =
	<T>(userRepository: IUserRepository<T>) =>
	async (
		user: Omit<T, "id" | "createdAt" | "updatedAt" | "role">,
	): Promise<T> => {
		return await userRepository.create({
			...user,
			role: "NURSE",
		} as T);
	};
