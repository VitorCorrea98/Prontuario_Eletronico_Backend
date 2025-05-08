export type GetDefaultEntity<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
