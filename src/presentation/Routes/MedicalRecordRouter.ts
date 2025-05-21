import { Router } from "express";
import { genericController } from "ts-express-generic";
import { MedicalRecordService } from "../../infra/Services/MedicalRecordService";
import { PrismaMedicalRecordRepository } from "../../infra/Repositories/PrismaMedicalRecordRepository";
import { validateRequestObject } from "../Controllers/User";
import type { TMedicalRecordCreateDTO } from "../../core/DTOs/MedicalRecord/MedicalRecordCreate";

export const medicalRecordRouter = Router();

const medicalRecordORM = PrismaMedicalRecordRepository;

const medicalRecordService = MedicalRecordService(medicalRecordORM);

medicalRecordRouter.get(
	"/",
	genericController({
		service: medicalRecordService.getAll,
		requestKeys: ["body"],
		middlewares: [],
	}),
);

medicalRecordRouter.post(
	"/",
	genericController({
		service: medicalRecordService.create,
		requestKeys: ["body"],
		middlewares: [
			validateRequestObject<TMedicalRecordCreateDTO>([
				"description",
				"userId",
				"patientId",
			]),
		],
	}),
);
