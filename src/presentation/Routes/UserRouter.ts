import type { IUserDeleteDTO, IUserLoginDTO } from "@core/User/DTOs";
import type { User } from "@core/User/Entities/User_Entity";
import type { CreateUserInput } from "@core/User/UseCases/User_CreateUser";
import type {
	UserDeleteInput,
	UserDeleteRequest,
} from "@core/User/UseCases/User_Delete";
import type { LoginInput, LoginRequest } from "@core/User/UseCases/User_Login";
import { Router } from "express";
import { PrismaUserRepository } from "../../infra/Repositories/PrismaUserRepository";
import { userService } from "../../infra/Services/UserService";
import type { ServiceResponse } from "../../shared/HTTP/ServiceReponse";
import { verifyJWT } from "../../shared/Security/authToken";
import { genericController } from "../Controllers/GenericController";
import {
	validateRequestObject,
	validateTokenRole,
	validateUserExists,
} from "../Controllers/User";

export const userRouter = Router();
const UserService = userService(PrismaUserRepository);

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5 // Limit each IP to 5 requests per window
// });

userRouter.post(
	"/",
	validateRequestObject<CreateUserInput>(["name", "email", "role", "password"]),
	genericController(UserService.create),
);

userRouter.post(
	"/login",
	validateRequestObject<IUserLoginDTO>(["email", "password"]),
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

userRouter.delete(
	"/:id/delete",
	validateRequestObject<Pick<User, "email">>(["email"]),
	verifyJWT,
	validateTokenRole("ADMIN"),
	genericController<UserDeleteInput, ServiceResponse, UserDeleteRequest>(
		UserService.delete,
		(req) => {
			if (!req.decoded) {
				throw new Error("Error on Delete request");
			}
			return {
				userToDelete: { ...req.body, ...req.params } as IUserDeleteDTO,
				decoded: req.decoded,
			};
		},
	),
);
