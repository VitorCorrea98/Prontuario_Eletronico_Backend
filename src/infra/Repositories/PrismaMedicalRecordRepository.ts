import { getPrismaClient } from "../../config/prisma";
import type { TMedicalRecord } from "../../core/Entities/MedicalRecord_Entity";
import type { TMedicalRecordRepository } from "../../core/Repositories/MedicalRecord_Repository";

const prismaClient = getPrismaClient();

export const PrismaMedicalRecordRepository: TMedicalRecordRepository<TMedicalRecord> =
  {
    async getAll() {
      return await prismaClient.medicalRecord.findMany({
        include: {
          user: { select: { name: true, role: true } },
          patient: {
            select: { name: true, birthDate: true },
          },
        },
      });
    },
    async create(medicalRecord) {
      return await prismaClient.medicalRecord.create({ data: medicalRecord });
    },
  };
