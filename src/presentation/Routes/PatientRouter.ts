import { Router } from "express";
import { genericController } from "ts-express-generic";
import type { TPatient } from "../../core/Entities/Patient_Entity";
import { PrismaPatientRepository } from "../../infra/Repositories/PrimsaPatientRepository";
import { PatientService } from "../../infra/Services/PatientService";
import { verifyJWT } from "../../shared/Security/authToken";
import type { GetDefaultEntity } from "../../types/entity";
import { validateRequestObject } from "../Controllers/User";

export const patientRouter = Router();

const patientService = PatientService(PrismaPatientRepository);

patientRouter.get(
  "/",
  genericController({
    service: patientService.getAll,
    requestKeys: [],
    middlewares: [verifyJWT],
  }),
);

patientRouter.post(
  "/create",
  genericController({
    service: patientService.create,
    requestKeys: ["body", "locals"],
    middlewares: [
      validateRequestObject<GetDefaultEntity<TPatient>>([
        "name",
        "address",
        "birthDate",
        "gender",
        "phone",
      ]),
      verifyJWT,
    ],
  }),
);
