import type { GetDefaultEntity } from "types/entity";

export type TPatientCreateRepository<T> = {
	create: (patient: GetDefaultEntity<T>) => Promise<T>;
};
