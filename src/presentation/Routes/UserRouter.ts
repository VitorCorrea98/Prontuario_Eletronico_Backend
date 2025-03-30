import { Router } from "express";

import type {
	LoginInput,
	LoginRequest,
} from "../../core/User/UseCases/User_Login";
import { PrismaUserRepository } from "../../infra/Repositories/PrismaUserRepository";
import { userService } from "../../infra/Services/UserService";
import type { ServiceResponse } from "../../shared/HTTP/ServiceReponse";
import { genericController } from "../Controllers/GenericController";
import { validateRequestObject } from "../Controllers/User/ValidateLoginDTO";
import { validateUserExists } from "../Controllers/User/validateUserExists";

export const userRouter = Router();
const UserService = userService(PrismaUserRepository);

userRouter.post(
	"/",
	validateRequestObject(["name", "email", "role", "password"]),
	genericController(UserService.create),
);

userRouter.post(
	"/login",
	validateRequestObject(["email", "password"]),
	validateUserExists(PrismaUserRepository),
	genericController<LoginInput, ServiceResponse, LoginRequest>(
		UserService.login,
		(req: LoginRequest) => {
			if (!req.user) {
				throw new Error("User is undefined");
			}
			return {
				userFound: req.user,
				userCredentials: req.body,
			};
		},
	),
);
