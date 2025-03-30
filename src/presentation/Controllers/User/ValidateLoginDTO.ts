import type { NextFunction, Request, Response } from "express";
import type { IUserLoginDTO } from "../../../core/User/DTOs/UserDTOLogin";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";

export const validateChoosenFieldOnObject = <T>(
	object: T,
	field: keyof T,
): ServiceResponse | null => {
	console.log({ field: object[field] });
	if (
		!object[field] ||
		(typeof object[field] === "string" && object[field].trim().length === 0)
	) {
		return {
			status: "INVALID_INPUT",
			error: `${field.toString().toUpperCase()} field is required`,
			message: `${field.toString().toUpperCase()} can't be empty`,
		};
	}
	return null;
};

export const validateRequestObject =
	(fieldsToValidate: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		const requestData = req.body;
		const errors = fieldsToValidate
			.map((field) => validateChoosenFieldOnObject(requestData, field))
			.filter(Boolean);

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
