import type { NextFunction, Request, Response } from "express";

const personalIP = process.env.PERSONAL_IP;

export const ipFilter = (req: Request, res: Response, next: NextFunction) => {
	if (req.ip?.replace("::ffff:", "") !== personalIP) {
		res.status(403).json({ message: "Access forbidden" });
		return;
	}
	next();
};

export const verifyAPIKey = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const apiKey = req.headers["x-api-key"];

	if (apiKey !== "eusoquerofazerumrequestporfavor") {
		res.status(403).json({ message: "Unauthorized" });
		return;
	}

	next();
};
