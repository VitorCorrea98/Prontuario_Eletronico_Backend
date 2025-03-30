import type { Request } from "express";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";
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
		const userLoginData = input.userCredentials;
		const userFound = input.userFound;
		const userFoundPassword = userFound?.password;

		const loginPasswordMatchUser = await comparePassword(
			userLoginData.password,
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
