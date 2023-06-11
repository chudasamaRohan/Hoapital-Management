const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models/index")
const patients = db.patients
const doctors = db.doctors
const appointments = db.appointments
const { patientSaver } = require("../services/patientServices")
const { appointMentSaver } = require("../services/appintmentServices")



const patientLogin = async (req, res, next) => {
    const patient = await patients.findOne({ where: { email: req.body.email } });
    if (patient) {
        const password_valid = await bcrypt.compare(req.body.password, patient.password);
        if (password_valid) {
            token = jwt.sign({ "id": patient.id, "email": patient.email }, process.env.SECRET);
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }

    } else {
        res.status(404).json({ error: "first registarion ." });
    }
}


const appointmentCreate = async (req, res) => {
    const patientId = req.id
    const { doctorId, visitDate, visitStartTime, discription, } = req.body
    try {
        const appData = await appointMentSaver({ patientId, visitStartTime, doctorId, visitDate, discription })
        if (appData) {
            res.send(appData)
        }
    } catch (error) {
        res.send(error)
    }
}

const pationantRegister = async (req, res) => {
    const { name, age, contact, email, password, gender } = req.body
    try {
        const registerData = await patientSaver({ name, age, contact, email, password, gender })
        if (registerData) {
            res.send("messege : registarion succesfully.")
        }
    } catch (error) {
        res.send(error)
    }
}

const findDoctorbyspeciality = async (req, res) => {
    const speciality = req.body.speciality

    try {
        const dr = await doctors.findAll({
            where:
                { speciality: speciality }
        })
        res.send(dr)
    } catch (error) {
        res.send(error)
    }
}

module.exports = { pationantRegister, findDoctorbyspeciality, appointmentCreate, patientLogin }