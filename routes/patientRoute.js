const express = require("express")
const patientRoutes = express.Router()

const { pationantRegister, patientLogin, findDoctorbyspeciality, appointmentCreate, } = require("../controller/patientController")
const { patientAuthgaurd } = require("../jwt/authgaurd_login")
const { checkDr, checkAppointMent } = require("../middlewear/finder")
const { checkByDate, checkByTime, checkOtherAppointment, cancleAppointMent } = require("../middlewear/appointmentMIddlewear")




patientRoutes.post("/register", pationantRegister)
patientRoutes.post("/login", patientLogin)
patientRoutes.post("/findByspeciality", patientAuthgaurd, findDoctorbyspeciality)
patientRoutes.post("/appointment", patientAuthgaurd, checkDr, checkByDate, checkByTime, checkOtherAppointment, appointmentCreate)
patientRoutes.post("/cancleAppointMent", patientAuthgaurd, checkAppointMent, cancleAppointMent)

module.exports = patientRoutes

