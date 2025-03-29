import { type Request, type Response, Router } from "express";

import { PrismaUserRepository } from "../../infra/Repositories/PrismaUserRepository";
import { userService } from "../../infra/Services/UserService";
import { genericController } from "../Controllers/GenericController";
import { validateLoginDTO } from "../Controllers/User/ValidateLoginDTO";
import { validateUserExists } from "../Controllers/User/validateUserExists";

export const userRouter = Router();
const UserService = userService(PrismaUserRepository);

userRouter.post("/", genericController(UserService.create));

userRouter.post(
	"/login",
	validateLoginDTO,
	validateUserExists(PrismaUserRepository),
	genericController(UserService.login),
);
