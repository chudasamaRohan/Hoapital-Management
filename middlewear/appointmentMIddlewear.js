const { Op } = require("sequelize")
const db = require("../models/index")
const doctors = db.doctors
const appointments = db.appointments



const { checkDate, isTimeInRange, checkTimeDiff } = require("../services/appintmentServices")



const cancleAppointMent = async (req, res) => {
    const delAppointmet = appointments.destroy({
        where: {
            id: req.body.appointMentId
        }
    })
    if (delAppointmet) {
        res.send("messege : appointMent cancle succesfully.")
    }
}


const checkByTime = async (req, res, next) => {
    const doctorData = req.doctorData
    const startTime = doctorData.startTime
    const endTime = doctorData.endTime
    const checkTime = req.body.visitStartTime
    const result = await isTimeInRange(startTime, endTime, checkTime)
    console.log(result);
    if (result == true) {
        next()
    } else if (result == false) {
        res.send("messege : at this time doctor not available")
    }
}


const checkOtherAppointment = async (req, res, next) => {
    const doctorData = req.doctorData
    const doctorId = doctorData.id
    const visitDate = req.body.visitDate
    const dt = new Date(visitDate)
    try {
        const appData = await appointments.findAll(
            {
                where: {
                    visitDate: {
                        [Op.eq]: dt
                    },
                    doctorId: {
                        [Op.eq]: doctorId
                    }
                }
            }
        )
        if (appData == null) {
            next()
        }
        const result = await checkTimeDiff(req, appData)
        if (result == true) {
            next()
        } else if (result == false) {
            res.send("messege : at this time allready booked.")
        }
    } catch (error) {
        res.send(error)
    }


}





const checkByDate = async (req, res, next) => {
    const doctorData = req.doctorData
    const leaveStart = new Date(doctorData.notAvailableStart)
    const leaveEnd = new Date(doctorData.notAvailableEnd)
    const visitDate = new Date(req.body.visitDate)
    const dateResult = await checkDate(leaveStart, leaveEnd, visitDate)
    if (dateResult == true) {
        next()
    } else {
        res.send("messege : in this date doctor not available.")
    }
}




module.exports = { checkByDate, checkByTime, checkOtherAppointment, cancleAppointMent }