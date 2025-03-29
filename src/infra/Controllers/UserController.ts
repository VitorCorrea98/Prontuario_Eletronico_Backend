import type { Request, Response } from "express";
import { getHTTPStatus } from "../../shared/HTTP/ServiceReponse";
import { createUserService } from "../Services/UserService";

export const createUserController = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const serviceResponse = await createUserService(req.body);

	const httpStatus = getHTTPStatus(serviceResponse.status);

	return res.status(httpStatus).json(serviceResponse);
};
