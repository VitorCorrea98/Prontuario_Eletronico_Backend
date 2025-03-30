import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key"; // Use an environment variable for security
const TOKEN_EXPIRATION = "1h"; // Token expiration time (e.g., 1 hour)

export interface AuthTokenPayload {
	email: string;
	role: string;
}

export const generateAuthToken = (payload: AuthTokenPayload): string => {
	// Generate a JWT token with the user's email and role
	return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};
