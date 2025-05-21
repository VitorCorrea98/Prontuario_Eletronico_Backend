import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { TMedicalRecord } from "../../Entities/MedicalRecord_Entity";
import type { TMedicalRecordReadRepository } from "../../Repositories/MedicalRecord_Repository";

export const medicalRecordGetAll =
	(medicalRecordRepository: TMedicalRecordReadRepository<TMedicalRecord>) =>
	async (): Promise<ServiceResponse> => {
		const medicalRecords = await medicalRecordRepository.getAll();

		await publishMessage("medicalRecord.getAll", medicalRecords);

		return {
			status: "OK",
			message: "Medical Records retrieved",
		};
	};
