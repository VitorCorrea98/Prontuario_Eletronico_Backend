import { Router } from "express";
import { userRouter } from "./UserRouter";

export const router = Router();

router.use("/user", userRouter);
