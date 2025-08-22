import type { GetDefaultEntity } from "../../types/entity";

export type TPatientCreateRepository<T> = {
  create: (patient: GetDefaultEntity<T>) => Promise<T>;
};

export type TPatientReadRepository<T> = {
  getAll: () => Promise<T[]>;
};

export type TPatientRepository<T> = TPatientCreateRepository<T> &
  TPatientReadRepository<T>;
