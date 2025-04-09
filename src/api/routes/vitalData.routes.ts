import express from "express";
import { VitalDataController } from "../controllers/vitalData.controller";

const vitalDataRouter = express.Router();
const vitalDataController = new VitalDataController();

vitalDataRouter.get("/", async (req, res) => {
  try {
    const vitals = await vitalDataController.findVitals();

    res.status(200).send({
      status: "SUCCESS",
      data: vitals,
    });
  } catch (err) {
    res.status(400).send({
      status: "ERROR",
      err: "errTitle",
      message: "formattedErr",
    });
  }
});

vitalDataRouter.post("/", async (req, res) => {
  try {
    const vital = req.body;

    const createdVital = await vitalDataController.createVital(vital);

    res.status(201).send({
      status: "SUCCESS",
      data: createdVital,
    });
  } catch (err) {
    res.status(400).send({
      status: "ERROR",
      err: "errTitle",
      message: "formattedErr",
    });
  }
});

export default vitalDataRouter;
