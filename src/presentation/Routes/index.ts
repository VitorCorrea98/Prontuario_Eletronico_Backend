import { Router } from "express";
import { medicalRecordRouter } from "./MedicalRecordRouter";
import { patientRouter } from "./PatientRouter";
import { userRouter } from "./UserRouter";

export const router = Router();

router.use("/user", userRouter);
router.use("/patient", patientRouter);
router.use("/medicalRecord", medicalRecordRouter);
