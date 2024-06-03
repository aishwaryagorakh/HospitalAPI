import DoctorRepository from "../models/doctors.repository.js";
import { sendToken } from "../../utils/sendToken.js";

export default class DoctorController {
  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async register(req, res, next) {
    const { username, password } = req.body;
    try {
      const existingDoctor = await this.doctorRepository.findDoctorByUSername(
        username
      );
      if (existingDoctor) {
        return res.status(400).json({ message: "Username already exist" });
      }
      const doctor = await this.doctorRepository.registerDoctor(req.body);
      res
        .status(201)
        .json({ message: "Doctor registerd successfully", doctor });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const doctor = await this.doctorRepository.findDoctorByUSername(username);
      if (!doctor) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const passwordMatch = await doctor.comparePassword(password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      await sendToken(doctor, res, 200);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req, res) {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, msg: "logout successful" });
  }
}
