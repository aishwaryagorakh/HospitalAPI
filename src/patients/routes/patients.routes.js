import express from "express";
import { auth } from "../../../middlewares/auth.middleware.js";
import PatientController from "../controllers/patient.controller.js";
const patientController = new PatientController();
const patientRoute = express.Router();

patientRoute.use(auth);

patientRoute.post("/patients/register", (req, res) => {
  patientController.register(req, res);
});
patientRoute.post("/patients/:id/create_report", (req, res) => {
  patientController.createReport(req, res);
});
patientRoute.get("/patients/:id/all_reports", (req, res) => {
  patientController.getAllReports(req, res);
});
patientRoute.get("/reports/:status", (req, res) => {
  patientController.statusOfAllPatient(req, res);
});

export default patientRoute;
