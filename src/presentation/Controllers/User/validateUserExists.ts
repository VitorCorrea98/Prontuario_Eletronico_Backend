import type { NextFunction, Request, Response } from "express";
import type { IUserLoginDTO } from "../../../core/DTOs/User/";
import type { User } from "../../../core/Entities/User_Entity";
import type { IUserReadRepository } from "../../../core/Repositories/User_Repository";

export const validateUserExists =
	(userRepository: IUserReadRepository<User>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const loginData = req.body as IUserLoginDTO;
		const userFound = await userRepository.findByEmail(loginData.email);

		if (!userFound) {
			return res.status(400).json({
				status: "BAD",
				message: "Invalid email/password",
				error: "Invalid email/password",
			});
		}

		res.locals.userFound = userFound;

		next();
	};
