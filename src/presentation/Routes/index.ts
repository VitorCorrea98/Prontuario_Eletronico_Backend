import { Router } from "express";
import { patientRouter } from "./PatientRouter";
import { userRouter } from "./UserRouter";
import { medicalRecordRouter } from "./MedicalRecordRouter";

export const router = Router();

router.use("/user", userRouter);
router.use("/patient", patientRouter);
router.use("/medicalRecord", medicalRecordRouter);
