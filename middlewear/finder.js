const db = require("../models/index")
const doctors = db.doctors
const patients = db.patients
const appointments = db.appointments
const { Op } = require("sequelize")


const checkpatient = async (req, res, next) => {
    const patientId = req.body.patientId
    const pt = await patients.findOne({
        where: {
            id: patientId
        }
    })
    if (pt) {
        req.patientData = pt
        next()
    } else {
        res.send("messege : patient not registerd.")
    }
}





const checkDoctor = async (req, res, next) => {
    const role = req.role
    if (role == 'doctor') {
        next()
    } else {
        res.send('messege : only pharmasist can permit for this aPI')
    }
}




const checkPharma = async (req, res, next) => {
    const role = req.role
    if (role == 'pharma') {
        next()
    } else {
        res.send('messege : only pharmasist can permit for this aPI')
    }
}


const checkAdmin = async (req, res, next) => {
    const role = req.role
    console.log(role);
    if (role == 'admin') {
        next()
    } else {
        res.send("messege : only admin can permit for this API.")
    }
}

const
    checkRoom = async (req, res, next) => {
        const roomID = req.body.roomId
        const rm = await db.rooms.findOne({
            where: {
                id: roomID
            }
        })
        if (rm) {
            req.roomData = rm
            next()
        } else {
            res.send("this room does not exits.")
        }
    }


const checkNurse = async (req, res, next) => {
    const role = req.role
    if (role == 'nurse') {

        next()
    } else {
        res.send('messege : only nurse can permit for this aPI')
    }
}


const checkAppointMent = async (req, res, next) => {
    const patientId = req.id
    const appointMentId = req.body.appointMentId
    const fatchAppointMent = await appointments.findOne(
        {
            where: {
                id: {
                    [Op.eq]: appointMentId
                },
                patientId: {
                    [Op.eq]: patientId
                }
            }
        }
    )

    if (fatchAppointMent) {
        next()
    } else {
        res.send("messege : this record not found.")
    }
}


const checkDr = async (req, res, next) => {
    let doctorId;

    if (!req.body.doctorId) {
        doctorId = req.id
    } else {
        doctorId = req.body.doctorId
    }
    const dr = await db.doctors.findOne(
        {
            where: {
                id: { [Op.eq]: doctorId },

            }
        }
    )
    if (dr) {
        req.doctorData = dr

        next()
    } else if (dr == null) {
        res.send("Doctor is not available.")
    }
}





module.exports = {
    checkDr,
    checkRoom,
    checkDoctor,
    checkPharma,
    checkNurse,
    checkAppointMent,
    checkAdmin,
    checkpatient
}