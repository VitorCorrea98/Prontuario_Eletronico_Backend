import type { NextFunction, Request, Response } from "express";
import type { IUserLoginDTO } from "../../../core/User/DTOs/UserDTOLogin";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";

export const validateChoosenFieldOnObject = <T>(
	user: T,
	field: keyof T,
): ServiceResponse | null => {
	if (!user[field]) {
		return {
			status: "INVALID_INPUT",
			error: `${field.toString().toUpperCase()} field is required`,
			message: `${field.toString().toUpperCase()} can't be empty`,
		};
	}
	return null;
};

export const validateLoginDTO = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const userLoginData = req.body as IUserLoginDTO;
	const errors = [
		validateChoosenFieldOnObject(userLoginData, "email"),
		validateChoosenFieldOnObject(userLoginData, "password"),
	].filter(Boolean);

	if (errors.length > 0) {
		res.status(400).json({
			status: "INVALID_INPUT",
			message: "Validation errors",
			errors,
		});
		return;
	}

	next();
};
