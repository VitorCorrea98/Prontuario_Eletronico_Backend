import type { User } from "../../Entities/User_Entity";

export type IUserLoginDTO = Pick<User, "email" | "password">;
