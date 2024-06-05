import PatientRepository from "../models/patients.repository.js";

export default class PatientController {
  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async register(req, res) {
    const { patientName, phoneNumber } = req.body;
    try {
      const patient = await this.patientRepository.register(
        patientName,
        phoneNumber
      );
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createReport(req, res) {
    try {
      const patient = await this.patientRepository.createReportForPatient(
        req.params.id,
        req.user.id,
        req.body.status
      );
      res.json(patient);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllReports(req, res) {
    const { id } = req.params;
    try {
      const reports = await this.patientRepository.getAllReportsForPatient(id);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async statusOfAllPatient(req, res) {
    try {
      const result = await this.patientRepository.statusOfAllPatient(
        req.params.status
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
