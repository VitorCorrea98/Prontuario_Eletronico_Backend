import type { GetDefaultEntity } from "../../types/entity";

export type TMedicalRecordCreateRepository<T> = {
	create: (medicalRecord: GetDefaultEntity<T>) => Promise<T>;
};

export type TMedicalRecordReadRepository<T> = {
	getAll: () => Promise<T[]>;
};

export type TMedicalRecordRepository<T> = TMedicalRecordCreateRepository<T> &
	TMedicalRecordReadRepository<T>;
