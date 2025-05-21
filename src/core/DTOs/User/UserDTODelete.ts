import type { User } from "../../Entities/User_Entity";

export type IUserDeleteDTO = Pick<User, "email" | "id">;
