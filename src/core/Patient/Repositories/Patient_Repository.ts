export type TPatientCreateRepository<T> = {
	create: () => Promise<T>;
};
