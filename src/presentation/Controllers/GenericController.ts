// genericController.ts
import type { Request, Response } from "express";
import {
	type ServiceFunction,
	type ServiceResponse,
	getHTTPStatus,
} from "../../shared/HTTP/ServiceReponse";

export const genericController =
	<TRequest, TResponse extends ServiceResponse>(
		serviceFunction: ServiceFunction<TRequest, TResponse>,
	) =>
	async (req: Request, res: Response): Promise<void> => {
		try {
			const serviceResponse = await serviceFunction(req as TRequest);

			const httpStatus = getHTTPStatus(serviceResponse.status);

			res.status(httpStatus).json(serviceResponse);
		} catch (error) {
			res.status(500).json({
				status: "ERROR",
				message: "Internal server error.",
				error: (error as Error).message,
			});
		}
	};
