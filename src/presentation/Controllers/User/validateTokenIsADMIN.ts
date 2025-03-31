import type { NextFunction, Response } from "express";
import type { UserDeleteRequest } from "../../../core/User/UseCases/User_Delete";

const JWT_SECRET = process.env.JWT_SECRET || "secret_JWT";

export const validateTokenIsADMIN = (
	req: UserDeleteRequest,
	res: Response,
	next: NextFunction,
) => {
	const decoded = req.decoded;

	if (decoded && decoded.role !== "ADMIN") {
		res
			.status(401)
			.json({ message: "Request not authorized", error: "Invalid ROLE" });
		return;
	}

	next();
};
