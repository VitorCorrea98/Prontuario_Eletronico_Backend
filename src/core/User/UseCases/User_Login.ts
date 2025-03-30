import type { Request } from "express";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";
import { generateAuthToken } from "../../../shared/Security/authToken";
import { comparePassword } from "../../../shared/Security/hash";
import type { IUserLoginDTO } from "../DTOs/UserDTOLogin";
import type { User } from "../Entities/User_Entity";

export type LoginInput = {
	userCredentials: IUserLoginDTO;
	userFound: User;
};

export type LoginRequest = Request & {
	user?: User;
};

export const userLogin = async (
	input: LoginInput,
): Promise<ServiceResponse> => {
	try {
		const { userFound, userCredentials: userLoginData } = input;

		const loginPasswordMatchUser = await comparePassword(
			userLoginData.password,
			userFound.password,
		);

		if (!loginPasswordMatchUser) {
			return {
				status: "BAD",
				message: "Invalid email/password",
				error: "Invalid email/password",
			};
		}

		const token = generateAuthToken({
			email: userFound.email,
			role: userFound.role,
		});

		await publishMessage("auth.token_generated", {
			userId: userFound.id,
			token: token,
			email: userFound.email,
			name: userFound.name,
		});

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
