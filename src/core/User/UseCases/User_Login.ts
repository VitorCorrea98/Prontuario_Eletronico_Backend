import type { Request } from "express";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";
import { comparePassword } from "../../../shared/Security/hash";
import type { CustomRequest } from "../../../types/express";
import type { IUserLoginDTO } from "../DTOs/UserDTOLogin";
import type { User } from "../Entities/User_Entity";
import type { IUserReadRepository } from "../Repositories/User_Repository";

export const userLogin =
	(userRepository: IUserReadRepository<User>) =>
	async (request: CustomRequest): Promise<ServiceResponse> => {
		try {
			const user = request.body as IUserLoginDTO;
			const userFound = request.user as User;

			const userFoundPassword = userFound?.password;

			const loginPasswordMatchUser = await comparePassword(
				user.password,
				userFoundPassword,
			);

			if (!loginPasswordMatchUser) {
				return {
					status: "BAD",
					message: "Invalid email/password",
					error: "Invalid email/password",
				};
			}

			return {
				status: "OK",
				message: "User login went well",
			};
		} catch (error) {
			return {
				status: "BAD",
				error: "Login error",
				message: "Error when trying to login",
			};
		}
	};
