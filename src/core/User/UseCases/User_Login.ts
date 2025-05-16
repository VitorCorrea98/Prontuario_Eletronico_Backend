import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import { generateAuthToken } from "../../../shared/Security/authToken";
import { comparePassword } from "../../../shared/Security/hash";
import type { User } from "../Entities/User_Entity";

export type LoginInput = {
	body: {
		email: string;
		password: string;
	};
	locals: {
		userFound: User;
	};
};

export const userLogin = async (
	input: LoginInput,
): Promise<ServiceResponse> => {
	try {
		const { body, locals } = input;

		const loginPasswordMatchUser = await comparePassword(
			body.password,
			locals.userFound.password,
		);

		if (!loginPasswordMatchUser) {
			return {
				status: "BAD_REQUEST",
				message: "Invalid email/password",
				error: "Invalid email/password",
			};
		}

		const token = generateAuthToken({
			email: locals.userFound.email,
			role: locals.userFound.role,
			id: locals.userFound.id,
		});

		await publishMessage("auth.token_generated", { token });

		return {
			status: "OK",
			message: "User login went well",
		};
	} catch (_error) {
		return {
			status: "BAD_REQUEST",
			error: "Login error",
			message: "Error when trying to login",
		};
	}
};
