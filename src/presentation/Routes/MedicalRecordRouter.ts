import { Router } from "express";
import { genericController } from "ts-express-generic";
import type { TMedicalRecordCreateDTO } from "../../core/DTOs/MedicalRecord/MedicalRecordCreate";
import { PrismaMedicalRecordRepository } from "../../infra/Repositories/PrismaMedicalRecordRepository";
import { MedicalRecordService } from "../../infra/Services/MedicalRecordService";
import { validateRequestObject } from "../Controllers/User";

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
