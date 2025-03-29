import type { Request } from "express";
import type { User } from "../../core/User/Entities/User_Entity";

export interface CustomRequest extends Request {
	user?: User;
}
