import type { ServiceResponse } from "ts-express-generic";
import { publishMessage } from "../../../infra/Messaging/publisher";
import type { AuthTokenPayload } from "../../../shared/Security/authToken";
import type { GetDefaultEntity } from "../../../types/entity";
import type { TPatient } from "../Entities/Patient_Entity";
import type { TPatientCreateRepository } from "../Repositories/Patient_Repository";

export type TPatientInput = {
	body: GetDefaultEntity<TPatient>;
	locals: {
		decoded: AuthTokenPayload;
	};
};

export const patientCreate =
	(patientRepository: TPatientCreateRepository<TPatient>) =>
	async (input: TPatientInput): Promise<ServiceResponse> => {
		const dateStr = input.body.birthDate as unknown as string;
		const [day, month, year] = dateStr.split("/").map(Number);
		const date = new Date(year, month - 1, day); // mês começa do 0

		console.log(input);

		const createdPatient = await patientRepository.create({
			...input.body,
			birthDate: date,
			userId: input.locals.decoded.id,
		});

		await publishMessage("patient.created", { name: createdPatient.name });

		return {
			status: "OK",
			message: "Patient created successfuly",
		};
	};
