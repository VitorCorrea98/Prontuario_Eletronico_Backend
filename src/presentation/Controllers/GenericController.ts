import type { Request, Response } from "express";
import {
	type ServiceFunction,
	type ServiceResponse,
	getHTTPStatus,
} from "../../shared/HTTP/ServiceReponse";

export const genericController =
	<
		TInput,
		TResponse extends ServiceResponse,
		TRequest extends Request = Request,
	>(
		serviceFunction: ServiceFunction<TInput, TResponse>,
		selector: (req: TRequest) => TInput = (req) => req.body as TInput,
	) =>
	async (req: TRequest, res: Response): Promise<void> => {
		try {
			const inputData = selector(req);
			const serviceResponse = await serviceFunction(inputData);

			const httpStatus = getHTTPStatus(serviceResponse.status);

			res.status(httpStatus).json(serviceResponse);
		} catch (error) {
			res.status(500).json({
				status: "ERROR",
				message: "Internal server error",
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	};
