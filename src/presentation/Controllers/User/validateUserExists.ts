// genericController.ts
import type { NextFunction, Request, Response } from "express";
import type { IUserLoginDTO } from "../../../core/User/DTOs/UserDTOLogin";
import type { User } from "../../../core/User/Entities/User_Entity";
import type { IUserReadRepository } from "../../../core/User/Repositories/User_Repository";
import type { CustomRequest } from "../../../types/express";

export const validateUserExists =
	(userRepository: IUserReadRepository<User>) =>
	async (
		req: CustomRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const loginData = req.body as IUserLoginDTO;
		const userFound = await userRepository.findByEmail(loginData.email);

		if (!userFound) {
			res.status(400).json({ message: "Invalid email/password" });
			return;
		}

		req.user = userFound;

		next();
	};
