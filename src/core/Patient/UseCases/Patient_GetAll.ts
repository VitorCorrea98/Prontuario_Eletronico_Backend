import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { TPatient } from "../Entities/Patient_Entity";
import type { TPatientReadRepository } from "../Repositories/Patient_Repository";

export const patientGetAll =
	(patientRepository: TPatientReadRepository<TPatient>) =>
	async (): Promise<ServiceResponse> => {
		const patients = await patientRepository.getAll();

		await publishMessage("patients.getAll", { patients });

		return {
			status: "OK",
			message: "All patients returned",
		};
	};
