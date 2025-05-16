// src/middlewares/errorHandler.ts
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	console.error("[GLOBAL ERROR]", err);
	// Fallback para erro desconhecido
	res.status(500).json({
		status: "INTERNAL_SERVER_ERROR",
		message: "An unexpected error occurred.",
		error: err.message,
	});
	return;
}
