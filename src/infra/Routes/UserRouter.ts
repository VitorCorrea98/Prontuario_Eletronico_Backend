import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { createUserController } from "../Controllers/UserController";

export const userRouter = Router();

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
	createUserController(req, res).catch(next);
});
