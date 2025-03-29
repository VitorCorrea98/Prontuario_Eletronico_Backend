export interface IUserCreateRepository<T> {
	create(userLoginForm: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
}

export interface IUserReadRepository<T> {
	findByEmail(email: string): Promise<T | null>;
}

export interface IUserRepository<T>
	extends IUserCreateRepository<T>,
		IUserReadRepository<T> {}
