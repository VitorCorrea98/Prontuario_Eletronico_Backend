import type { TMedicalRecord } from "../../core/Entities/MedicalRecord_Entity";
import type { TMedicalRecordRepository } from "../../core/Repositories/MedicalRecord_Repository";
import { medicalRecordCreate } from "../../core/UseCases/MedicalRecord/MedicalRecord_Create";
import { medicalRecordGetAll } from "../../core/UseCases/MedicalRecord/MedicalRecord_GetAll";

export const MedicalRecordService = (
  ORMRepository: TMedicalRecordRepository<TMedicalRecord>,
) => ({
  getAll: medicalRecordGetAll(ORMRepository),
  create: medicalRecordCreate(ORMRepository),
});
