import type { TPatient } from "../../core/Entities/Patient_Entity";
import type { TPatientRepository } from "../../core/Repositories/Patient_Repository";
import { patientCreate, patientGetAll } from "../../core/UseCases/Patient";

export const PatientService = (
	ORMRepository: TPatientRepository<TPatient>,
) => ({
	getAll: patientGetAll(ORMRepository),
	create: patientCreate(ORMRepository),
});
