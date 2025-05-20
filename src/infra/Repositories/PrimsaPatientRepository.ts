import { getPrismaClient } from "../../config/prisma";
import type { TPatient } from "../../core/Patient/Entities/Patient_Entity";
import type { TPatientRepository } from "../../core/Patient/Repositories/Patient_Repository";

const prisma = getPrismaClient();

export const PrismaPatientRepository: TPatientRepository<TPatient> = {
	getAll() {
		return prisma.patient.findMany({
			include: { medicalRecords: true, consultation: true },
		});
	},

	create(patient) {
		return prisma.patient.create({ data: patient });
	},
};
