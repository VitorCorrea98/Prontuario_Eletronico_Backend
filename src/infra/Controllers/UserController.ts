import type { Request, Response } from "express";
import { createUserService } from "../Services/UserService";

export const createUserController = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const user = await createUserService(req.body);

		return res.status(200).json(user);
	} catch (error) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
