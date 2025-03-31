import { type Request, Router } from "express";
import type { IUserDeleteDTO } from "../../core/User/DTOs/UserDTODelete";
import type {
	UserDeleteInput,
	UserDeleteRequest,
} from "../../core/User/UseCases/User_Delete";
import type {
	LoginInput,
	LoginRequest,
} from "../../core/User/UseCases/User_Login";
import { PrismaUserRepository } from "../../infra/Repositories/PrismaUserRepository";
import { userService } from "../../infra/Services/UserService";
import type { ServiceResponse } from "../../shared/HTTP/ServiceReponse";
import { verifyJWT } from "../../shared/Security/authToken";
import { genericController } from "../Controllers/GenericController";
import { validateRequestObject } from "../Controllers/User/ValidateLoginDTO";
import { validateTokenIsADMIN } from "../Controllers/User/validateTokenIsADMIN";
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

userRouter.delete(
	"/:id/delete",
	verifyJWT,
	validateTokenIsADMIN,
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
