import express from "express";
import vitalDataRouter from "./vitalData.routes";

const router = express.Router();

// router.use("/patient", patientRouter);
router.use("/vital", vitalDataRouter)

export default router;