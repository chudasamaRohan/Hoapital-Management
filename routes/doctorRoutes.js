const express = require("express")
const doctorRoutes = express.Router()

const { createAvailibility, doctorLogin, seeMyAppointment, createPrsct } = require("../controller/doctorController")
const { staffAuthgaurd } = require("../jwt/authgaurd_login")
const { checkDr, checkDoctor, checkpatient } = require("../middlewear/finder")


doctorRoutes.post("/login", doctorLogin)
doctorRoutes.post("/createvisittime", staffAuthgaurd, createAvailibility)
doctorRoutes.post("/seeMyappointMent", staffAuthgaurd, seeMyAppointment)
doctorRoutes.post("/createPrescription", staffAuthgaurd, checkDoctor, checkpatient, createPrsct)


module.exports = doctorRoutes