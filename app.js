import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import doctorRoute from "./src/doctors/routes/doctors.routes.js";
import patientRoute from "./src/patients/routes/patients.routes.js";
dotenv.config();

export const app = express();

// Parse incoming request bodies in JSON format
app.use(express.json());
// Parse cookies attached to the request
app.use(cookieParser());
//Configure routes
app.use("/doctors", doctorRoute);
app.use("", patientRoute);
