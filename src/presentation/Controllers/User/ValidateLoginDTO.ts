import type { NextFunction, Request, Response } from "express";
import type { ServiceResponse } from "../../../shared/HTTP/ServiceReponse";

export const validateChoosenFieldOnObject = <T>(
	object: T,
	field: keyof T,
): ServiceResponse | null => {
	if (
		!object[field] ||
		(typeof object[field] === "string" && object[field].trim().length === 0)
	) {
		return {
			status: "UNPROCESSABLE_ENTITY",
			error: `${field.toString().toUpperCase()} field is required`,
			message: `${field.toString().toUpperCase()} can't be empty`,
		};
	}
	return null;
};

export const validateRequestObject =
	<T>(fieldsToValidate: (keyof T)[]) =>
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

		// Validate extra fields
		const requestKeys = Object.keys(requestData) as (keyof T)[];
		const extraKeys = requestKeys.filter(
			(key) => !fieldsToValidate.includes(key),
		);

		if (extraKeys.length > 0) {
			res.status(404).json({ message: "Unexpected keys on request" });
			return;
		}

		next();
	};
