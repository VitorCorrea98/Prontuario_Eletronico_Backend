import type { NextFunction, Response } from "express";
import type { User } from "../../../core/User/Entities/User_Entity";
import type { UserDeleteRequest } from "../../../core/User/UseCases/User_Delete";

const _teste = "estando";
const _JWT_SECRET = process.env.JWT_SECRET || "secret_JWT";

export const validateTokenRole =
	(roleToValidate: Pick<User, "role">["role"]) =>
	(req: UserDeleteRequest, res: Response, next: NextFunction) => {
		const decoded = req.decoded;

		if (decoded && decoded.role !== roleToValidate) {
			res
				.status(401)
				.json({ message: "Request not authorized", error: "Invalid ROLE" });
			return;
		}

		next();
	};
