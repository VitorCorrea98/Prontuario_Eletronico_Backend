import type { Request } from "express";
import * as jwt from "jsonwebtoken";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";
import type { AuthTokenPayload } from "../../../shared/Security/authToken";
import type { IUserDeleteDTO } from "../DTOs/UserDTODelete";
import type { User } from "../Entities/User_Entity";
import type { IUserDeleteRepository } from "../Repositories/User_Repository";

export type UserDeleteInput = {
	userToDelete: IUserDeleteDTO;
	decoded: AuthTokenPayload;
};

export type UserDeleteRequest = Request & {
	decoded?: AuthTokenPayload;
};

export const userDelete =
	(userRepository: IUserDeleteRepository<User>) =>
	async (input: UserDeleteInput): Promise<ServiceResponse> => {
		try {
			const { userToDelete, decoded } = input;

			await userRepository.delete(userToDelete);
			console.log({ userToDelete, decoded });

			await publishMessage("user.deleted", {
				message: `User id: ${userToDelete.id} and email: ${userToDelete.email} was deleted successfuly`,
			});

			return {
				status: "OK",
				message: "User deleted",
			};
		} catch (error) {
			return {
				status: "BAD",
				error: "Error when trying to delete user",
				message: "Error when trying to delete user",
			};
		}
	};
