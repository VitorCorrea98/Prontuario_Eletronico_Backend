import type { TPatient } from "../../core/Patient/Entities/Patient_Entity";
import type { TPatientRepository } from "../../core/Patient/Repositories/Patient_Repository";
import { patientCreate } from "../../core/Patient/UseCases/Patient_Create";
import { patientGetAll } from "../../core/Patient/UseCases/Patient_GetAll";

export const PatientService = (
	ORMRepository: TPatientRepository<TPatient>,
) => ({
	getAll: patientGetAll(ORMRepository),
	create: patientCreate(ORMRepository),
});
