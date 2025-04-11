import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../../core/User/Entities/User_Entity";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const TOKEN_EXPIRATION = "1h";

export type AuthTokenPayload = Pick<User, "email" | "role">;

export const generateAuthToken = (payload: AuthTokenPayload): string =>
	jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Request type to include user data

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Unauthorized: No token provided" });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		(req as Request & { decoded: AuthTokenPayload }).decoded =
			decoded as AuthTokenPayload;
		next();
	} catch (_error) {
		res.status(403).json({ message: "Forbidden: Invalid token" });
		return;
	}
};
