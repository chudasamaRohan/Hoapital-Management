const express = require("express")
const staffRoutes = express.Router()

const { staffAuthgaurd } = require("../jwt/authgaurd_login")
const { checkNurse, checkRoom, checkPharma, checkpatient } = require("../middlewear/finder")
const { roomEntry, dischargePatient } = require("../controller/staffController/nurseController")
const { staffLogin } = require("../controller/staffController/loginStaff")
const { roomAvailibility } = require("../services/staffServices")
const { medicinFinder, medicinSaver, medicinCheck, upDateMedicine, seePrescription } = require("../controller/staffController/pharmaACOntroller")



staffRoutes.post("/login", staffLogin)
// nurse
staffRoutes.post("/admitEntry", staffAuthgaurd, checkNurse, checkRoom, roomAvailibility, roomEntry)
staffRoutes.post("/discharge", staffAuthgaurd, dischargePatient)
// pharma
staffRoutes.post("/addNewMedicine", staffAuthgaurd, checkPharma, medicinFinder, medicinSaver)
staffRoutes.post("/updateStock", staffAuthgaurd, checkPharma, medicinCheck, upDateMedicine)
staffRoutes.post("/prescripstion", staffAuthgaurd, checkPharma, checkpatient, seePrescription)

module.exports = staffRoutes