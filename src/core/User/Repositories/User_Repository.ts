export interface IUserRepository<T> {
	create(userLoginForm: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
	findByEmail(email: string): Promise<T | null>;
}
