import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { TMedicalRecordCreateDTO } from "../../DTOs/MedicalRecord/MedicalRecordCreate";
import type { TMedicalRecord } from "../../Entities/MedicalRecord_Entity";
import type { TMedicalRecordCreateRepository } from "../../Repositories/MedicalRecord_Repository";

type createInput = {
	body: TMedicalRecordCreateDTO;
};

export const medicalRecordCreate =
	(medicalRecordRepository: TMedicalRecordCreateRepository<TMedicalRecord>) =>
	async (input: createInput): Promise<ServiceResponse> => {
		try {
			const createdMedicalRecord = await medicalRecordRepository.create(
				input.body,
			);

			await publishMessage("medicalRecord.create", {
				id: createdMedicalRecord.id,
				description: createdMedicalRecord.description,
			});

			return {
				status: "CREATED",
				message: "Medical Record created with success.",
			};
		} catch (error) {
			return {
				status: "BAD_REQUEST",
				message: "Error when creating medical record.",
				error,
			};
		}
	};
