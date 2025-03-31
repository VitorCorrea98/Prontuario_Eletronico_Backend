import type { AuthTokenPayload } from "../../../shared/Security/authToken";
import type { IUserDeleteDTO } from "../DTOs/UserDTODelete";

export type IUserCreateRepository<T> = {
	create(userLoginForm: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
};

export type IUserReadRepository<T> = {
	findByEmail(email: string): Promise<T | null>;
};

export type IUserDeleteRepository<T> = {
	delete(userToDelete: IUserDeleteDTO): Promise<T>;
};

export type IUserRepository<T> = IUserCreateRepository<T> &
	IUserReadRepository<T> &
	IUserDeleteRepository<T>;
