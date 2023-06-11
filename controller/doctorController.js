const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models/index")
const doctors = db.doctors
const prescriptions = db.prescriptions


const createPrsct = async (req, res) => {
    const doctorId = req.id
    const { patientId, medicine, syrup, other } = req.body

    const pr = await prescriptions.create({ patientId, doctorId, medicine, syrup, other })
    if (pr) {
        res.send(pr)
    } else {
        res.send("messege : createprsct error.")
    }

}



const seeMyAppointment = async (req, res) => {
    const date = req.body.Date
    const MyappointMent = await db.appointments.findAll({
        where: {
            doctorId: {
                [Op.eq]: req.id
            }
        },
    })
    if (!MyappointMent) {
        res.send("messege : you have not appointment")
    } else if (MyappointMent) {
        res.send(MyappointMent)
    }
}

const doctorLogin = async (req, res) => {
    const doctor = await db.staffs.findOne({ where: { email: req.body.email } });
    if (doctor) {
        const password_valid = await bcrypt.compare(req.body.password, doctor.password);
        if (password_valid) {
            token = jwt.sign({ "id": doctor.id, "email": doctor.email, "role": doctor.role, "name": doctor.name }, process.env.SECRET);
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    } else {
        res.status(404).json({ error: "first registarion ." });
    }
}

const createAvailibility = async (req, res) => {
    const name = req.name
    console.log(name);
    const { speciality, notAvailableEnd, notAvailableStart, startTime, endTime, } = req.body
    try {
        const avl = await doctors.create({ name, speciality, notAvailableEnd, notAvailableStart, startTime, endTime })
        if (avl) {
            res.send(avl)
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = { createAvailibility, doctorLogin, seeMyAppointment, createPrsct }